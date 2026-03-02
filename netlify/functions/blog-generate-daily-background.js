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
  
  console.log(`Generating blog post ${index + 1} with query: "${searchQuery}"`);
  console.log(`Search context length: ${searchContext ? searchContext.length : 0} characters`);

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
- IMPORTANT: In the "content" field, escape all quotes with \\" and avoid special characters that break JSON.

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

IMPORTANT: In the "content" field, escape all quotes with \\" and avoid special characters that break JSON.

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
CRITICAL: Ensure the JSON is valid - escape all quotes in content with \\" and use proper JSON formatting.`;

  let response;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      console.log(`OpenAI API attempt ${attempts + 1}/${maxAttempts}`);
      
      response = await fetch("https://api.openai.com/v1/chat/completions", {
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
          temperature: 0.7, // Slightly lower for more consistent JSON
          max_tokens: 4000,  // Ensure enough tokens for full response
        }),
      });

      if (response.ok) {
        console.log(`OpenAI API successful on attempt ${attempts + 1}`);
        break;
      } else {
        const errorText = await response.text();
        console.error(`OpenAI API error (attempt ${attempts + 1}): ${response.status} ${errorText}`);
        
        if (response.status === 429) {
          // Rate limit, wait before retry
          await new Promise(resolve => setTimeout(resolve, (attempts + 1) * 2000));
        }
      }
    } catch (networkError) {
      console.error(`Network error on attempt ${attempts + 1}:`, networkError);
    }
    
    attempts++;
    if (attempts < maxAttempts) {
      console.log(`Waiting before retry...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
    }
  }

  if (!response || !response.ok) {
    const text = response ? await response.text() : 'No response';
    throw new Error(`OpenAI error after ${maxAttempts} attempts: ${response?.status || 'Network error'} ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned no content");
  }

  const jsonStart = content.indexOf("{");
  const jsonEnd = content.lastIndexOf("}");
  let jsonString =
    jsonStart !== -1 && jsonEnd !== -1
      ? content.slice(jsonStart, jsonEnd + 1)
      : content;

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse OpenAI JSON, attempting to fix...");
    console.error("Original content length:", content.length);
    console.error("JSON string length:", jsonString.length);
    
    // Attempt to fix common JSON issues
    try {
      // Fix unescaped quotes in content field
      jsonString = jsonString.replace(
        /"content":\s*"([^"]*(?:\\.[^"]*)*)"([^}]*)/g,
        (match, contentPart, rest) => {
          // Escape internal quotes in the content
          const escapedContent = contentPart.replace(/(?<!\\)"/g, '\\"');
          return `"content": "${escapedContent}"${rest}`;
        }
      );
      
      parsed = JSON.parse(jsonString);
      console.log("Successfully fixed and parsed JSON");
    } catch (fixAttemptError) {
      console.error("Failed to fix JSON, creating fallback post");
      
      // Create a fallback post if JSON parsing completely fails
      const fallbackSlug = `ai-insights-${Date.now()}`;
      parsed = {
        slug: fallbackSlug,
        title: `AI Engineering Insights - ${getTodayDateString()}`,
        excerpt: "Latest developments in AI, LLM, and engineering practices from recent research and industry updates.",
        date: getTodayDateString(),
        readTime: "12 min read",
        tags: ["AI", "LLM", "Engineering", "Technology"],
        sourceUrl: "https://example.com",
        content: `# AI Engineering Insights - ${getTodayDateString()}\n\nThis post was automatically generated with the latest AI and engineering insights.\n\n## Key Developments\n\n- Advanced AI model capabilities\n- New engineering frameworks\n- Industry best practices\n- Future technology trends\n\nStay tuned for more detailed analysis and technical deep-dives.`
      };
    }
  }

  return parsed;
}

async function runGeneration() {
  const pool = getPool();

  const { rows: existingRows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM blog_posts
     WHERE source = 'auto_ai' AND published_at::date = CURRENT_DATE`
  );

  const remaining = Math.min(1, Math.max(0, 2 - (existingRows[0]?.count || 0)));
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

    // Ensure unique slug by adding timestamp if needed
    let finalSlug = draft.slug;
    let attempt = 0;
    let insertResult;
    
    while (attempt < 3) {
      try {
        insertResult = await pool.query(
          `INSERT INTO blog_posts
             (slug, title, excerpt, date, read_time, tags, content, source, published_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'auto_ai', NOW())
           RETURNING slug`,
          [
            finalSlug,
            draft.title,
            draft.excerpt,
            dateStr,
            draft.readTime,
            draft.tags || [],
            draft.content,
          ]
        );
        
        if (insertResult.rows.length > 0) {
          created.push(finalSlug);
          break;
        }
      } catch (error) {
        if (error.code === '23505') { // Unique constraint violation
          attempt++;
          finalSlug = `${draft.slug}-${Date.now()}-${attempt}`;
          console.warn(`Slug conflict, trying with: ${finalSlug}`);
        } else {
          throw error;
        }
      }
    }
    
    if (attempt >= 3) {
      console.error("Failed to insert after 3 attempts due to slug conflicts");
    }
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
