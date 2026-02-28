const { getPool } = require("./db");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const SEARCH_QUERIES = [
  "latest AI LLM RAG developments 2026",
  "AI agents frameworks multi-agent systems 2026",
];

function getTodayDateString() {
  const d = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

async function fetchWebSearchResults(query, index) {
  if (!TAVILY_API_KEY) return null;
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        max_results: 8,
        topic: "general",
        time_range: "week",
        search_depth: "basic",
      }),
    });
    if (!res.ok) {
      console.error("Tavily search error", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data.results || [];
  } catch (e) {
    console.error("Web search error", e);
    return null;
  }
}

function formatSearchContext(results) {
  if (!results || results.length === 0) return "";
  return results
    .slice(0, 6)
    .map(
      (r, i) =>
        `[Source ${i + 1}] ${r.title || ""}\nURL: ${r.url || ""}\n${r.content || ""}`
    )
    .join("\n\n---\n\n");
}

async function generateBlogTopicAndContent(searchContext, searchQuery, index) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const todayStr = getTodayDateString();
  const hasSearch = searchContext && searchContext.trim().length > 0;

  const prompt = hasSearch
    ? `
You are an expert AI engineer and technical writer.
Using the following RECENT WEB SEARCH RESULTS, draft ONE blog post for practicing engineers.
Search query used: "${searchQuery || ""}"
TODAY'S DATE IS: ${todayStr}. Use this EXACT date for the "date" field.

WEB SEARCH RESULTS:
${searchContext}

INSTRUCTIONS:
- Base the blog on the search results above. Use facts, insights, and recent developments from these sources.
- Cite or reference the sources where appropriate.
- Write in an engaging, expert tone. 1200-2000 words.
- Pick the first result's URL as "sourceUrl" for image scraping (if it has a valid URL).
- The "date" field MUST be exactly: "${todayStr}".

Return STRICTLY valid JSON with this shape:
{
  "slug": "url-friendly-slug",
  "title": "Readable title",
  "excerpt": "1-2 sentence summary.",
  "date": "${todayStr}",
  "readTime": "NN min read",
  "tags": ["Tag1", "Tag2"],
  "sourceUrl": "https://first-source-url-from-results-above",
  "content": "# Markdown title... (full article)"
}
Do NOT add any explanation outside the JSON.
`
    : `
You are an expert AI engineer and technical writer.
Generate ONE blog post about AI/LLMs/RAG/agents for practicing engineers.
TODAY'S DATE IS: ${todayStr}. Use this EXACT date for the "date" field.

Return STRICTLY valid JSON with this shape:
{
  "slug": "url-friendly-slug",
  "title": "Readable title",
  "excerpt": "1-2 sentence summary.",
  "date": "${todayStr}",
  "readTime": "NN min read",
  "tags": ["Tag1", "Tag2"],
  "sourceUrl": "https://example.com/authoritative-article-with-good-hero-image",
  "content": "# Markdown title... (full article, 1200-2000 words)"
}
Do NOT add any explanation outside the JSON.
The "date" field MUST be exactly: "${todayStr}".
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned no content");
  }

  const jsonStart = content.indexOf("{");
  const jsonEnd = content.lastIndexOf("}");
  const jsonString =
    jsonStart !== -1 && jsonEnd !== -1
      ? content.slice(jsonStart, jsonEnd + 1)
      : content;

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse OpenAI JSON", content);
    throw e;
  }

  return parsed;
}

async function runGeneration() {
  const pool = getPool();

  const { rows: existingRows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM blog_posts
     WHERE source = 'auto_ai' AND published_at::date = CURRENT_DATE`
  );

  const remaining = Math.max(0, 2 - (existingRows[0]?.count || 0));
  if (remaining === 0) {
    return { done: true, message: "Already generated 2 posts for today" };
  }

  const created = [];
  for (let i = 0; i < remaining; i++) {
    const query = SEARCH_QUERIES[i % SEARCH_QUERIES.length];
    const searchResults = await fetchWebSearchResults(query, i);
    const searchContext = formatSearchContext(searchResults);
    const draft = await generateBlogTopicAndContent(searchContext, query, i);
    const dateStr = getTodayDateString();

    const insertResult = await pool.query(
      `INSERT INTO blog_posts
         (slug, title, excerpt, date, read_time, tags, content, source, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'auto_ai', NOW())
       ON CONFLICT (slug) DO NOTHING RETURNING slug`,
      [
        draft.slug,
        draft.title,
        draft.excerpt,
        dateStr,
        draft.readTime,
        draft.tags || [],
        draft.content,
      ]
    );

    if (insertResult.rows.length > 0) created.push(draft.slug);
    else console.warn("Skipped insert due to slug conflict", draft.slug);
  }

  return { created };
}

// Background function: runs synchronously (15 min timeout) so work reliably completes
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const result = await runGeneration();
    if (result.done) {
      console.log("blog-generate-daily:", result.message);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: result.message }),
      };
    }
    console.log("blog-generate-daily: created", result.created);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ created: result.created }),
    };
  } catch (err) {
    console.error("blog-generate-daily error", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to generate blog posts" }),
    };
  }
};
