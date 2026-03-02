const { getPool } = require("./db");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// Diverse search topics so each run gets different content
const SEARCH_TOPICS = [
  "latest RAG retrieval augmented generation 2026",
  "AI agents multi-agent systems frameworks 2026",
  "LLM fine-tuning open source models 2026",
  "vector databases embeddings similarity search",
  "prompt engineering techniques LLM 2026",
  "MLOps AI model deployment production",
  "computer vision multimodal AI 2026",
  "LLM evaluation benchmarking metrics",
  "open source vs closed LLMs comparison",
  "AI code generation developer tools",
  "retrieval augmented generation best practices",
  "AI agents autonomous systems research",
  "transformer architecture efficiency optimization",
  "AI safety alignment responsible AI",
  "small language models edge deployment",
  "AI research breakthroughs 2026",
];

// Content angles for variety: different formats and hooks each time
const CONTENT_ANGLES = [
  "Write a practical how-to with step-by-step takeaways. Use a specific, surprising title (not 'Complete Guide').",
  "Write an opinion or trend piece with a bold take. Hook with a contrarian or provocative angle.",
  "Write a deep technical dive on one narrow topic. Title should sound like a conference talk or deep-dive.",
  "Write a listicle or roundup (e.g. '5 X that Y'). Make each point actionable and distinct.",
  "Write a case study or 'lessons learned' style post. Use a concrete scenario or story hook.",
  "Write a tutorial with code or config snippets. Title should promise a clear outcome.",
  "Write a comparison or 'X vs Y' piece. Be opinionated and give a clear recommendation.",
  "Write a forward-looking piece on where the field is heading. Use a question or prediction as the hook.",
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

// Pick a topic and content angle that varies by date and run (morning vs evening)
function pickTopicAndAngle(runIndex) {
  const d = new Date();
  const daySeed = d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
  const hourSeed = d.getHours(); // 9 AM vs 6 PM run
  const topicIndex = (daySeed + hourSeed + runIndex * 7) % SEARCH_TOPICS.length;
  const angleIndex = (daySeed + hourSeed * 2 + runIndex * 11) % CONTENT_ANGLES.length;
  return {
    searchQuery: SEARCH_TOPICS[topicIndex],
    contentAngle: CONTENT_ANGLES[angleIndex],
  };
}

async function generateBlogTopicAndContent(searchContext, searchQuery, contentAngle, index, recentTitles = []) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  
  console.log(`Generating blog post ${index + 1} with query: "${searchQuery}"`);
  console.log(`Angle: ${contentAngle}`);
  console.log(`Search context length: ${searchContext ? searchContext.length : 0} characters`);

  const todayStr = getTodayDateString();
  const hasSearch = searchContext && searchContext.trim().length > 0;
  const avoidBlock =
    recentTitles.length > 0
      ? `\nAVOID repeating topics or titles similar to these recent posts:\n${recentTitles.map((t) => `- ${t}`).join("\n")}\nChoose a clearly different topic or angle.\n`
      : "";

  const prompt = hasSearch
    ? `
You are an AI enthusiast and expert content writer. You write for engineers and practitioners—each post must feel FRESH and different from typical "AI guide" content. Avoid generic titles like "Complete Guide to X" or "Everything You Need to Know." Surprise the reader with a specific angle, a bold take, or a concrete hook.

Search query for this post: "${searchQuery || ""}"
TODAY'S DATE IS: ${todayStr}. Use this EXACT date for the "date" field.

CONTENT DIRECTION FOR THIS POST:
${contentAngle}
${avoidBlock}

WEB SEARCH RESULTS (use these for facts, news, and recent developments):
${searchContext}

INSTRUCTIONS:
- Base the blog on the search results where relevant. Use facts and recent developments from these sources.
- Follow the CONTENT DIRECTION above so this post has a distinct format and hook.
- Write in an engaging, enthusiast tone—like a skilled content writer who loves AI. Vary sentence length and use concrete examples.
- 1200-2000 words. The "date" field MUST be exactly: "${todayStr}".
- In the "content" field, escape all quotes with \\" and avoid special characters that break JSON.
- Choose a unique, memorable title and a url-friendly slug that reflects it.

Return STRICTLY valid JSON with this shape:
{
  "slug": "url-friendly-slug",
  "title": "Specific, engaging title (not generic)",
  "excerpt": "1-2 sentence summary.",
  "date": "${todayStr}",
  "readTime": "NN min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "sourceUrl": "https://first-source-url-from-results-above",
  "content": "# Markdown title... (full article)"
}
Do NOT add any explanation outside the JSON.
`
    : `
You are an AI enthusiast and expert content writer. You write for engineers and practitioners—each post must feel FRESH and different. Avoid generic titles like "Complete Guide to X." Use a specific angle, a bold take, or a concrete hook.

TODAY'S DATE IS: ${todayStr}. Use this EXACT date for the "date" field.

CONTENT DIRECTION FOR THIS POST:
${contentAngle}
${avoidBlock}

Topic focus: ${searchQuery || "AI/LLMs/RAG/agents"}

INSTRUCTIONS:
- Follow the CONTENT DIRECTION above so this post has a distinct format and hook.
- Write in an engaging, enthusiast tone. 1200-2000 words.
- The "date" field MUST be exactly: "${todayStr}".
- In the "content" field, escape all quotes with \\" and avoid special characters that break JSON.
- Choose a unique title and url-friendly slug.

Return STRICTLY valid JSON with this shape:
{
  "slug": "url-friendly-slug",
  "title": "Specific, engaging title",
  "excerpt": "1-2 sentence summary.",
  "date": "${todayStr}",
  "readTime": "NN min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "sourceUrl": "https://example.com",
  "content": "# Markdown title... (full article)"
}
Do NOT add any explanation outside the JSON. Ensure valid JSON—escape all quotes in content with \\".
`;

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
          temperature: 0.85,
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

  // Fetch recent auto_ai titles so we can ask the model to avoid repeating the same topic
  let recentTitles = [];
  try {
    const { rows: recent } = await pool.query(
      `SELECT title FROM blog_posts WHERE source = 'auto_ai' ORDER BY published_at DESC LIMIT 10`
    );
    recentTitles = recent.map((r) => r.title).filter(Boolean);
  } catch (_) {}

  const created = [];
  for (let i = 0; i < remaining; i++) {
    const { searchQuery, contentAngle } = pickTopicAndAngle(i);
    const searchResults = await fetchWebSearchResults(searchQuery, i);
    const searchContext = formatSearchContext(searchResults);
    const draft = await generateBlogTopicAndContent(searchContext, searchQuery, contentAngle, i, recentTitles);
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
