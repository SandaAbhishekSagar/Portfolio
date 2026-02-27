const { getPool } = require("./db");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateBlogTopicAndContent() {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const prompt = `
You are an expert AI engineer and technical writer.
Generate ONE blog post about AI/LLMs/RAG/agents for practicing engineers.

Return STRICTLY valid JSON with this shape:
{
  "slug": "url-friendly-slug",
  "title": "Readable title",
  "excerpt": "1-2 sentence summary.",
  "date": "Month DD, YYYY",
  "readTime": "NN min read",
  "tags": ["Tag1", "Tag2"],
  "sourceUrl": "https://example.com/authoritative-article-with-good-hero-image",
  "content": "# Markdown title... (full article, 1200-2000 words)"
}
Do NOT add any explanation outside the JSON.
Use today's date for the "date" field.
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

async function fetchImageUrlFromPage(url) {
  if (!url) return null;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error("Failed to fetch source page", url, res.status);
      return null;
    }
    const html = await res.text();

    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (ogMatch && ogMatch[1]) return ogMatch[1];

    const twMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (twMatch && twMatch[1]) return twMatch[1];

    const imgMatch = html.match(/<img[^>]+src=["']([^"']+\.(?:png|jpe?g|webp|gif))["'][^>]*>/i);
    if (imgMatch && imgMatch[1]) return imgMatch[1];

    return null;
  } catch (e) {
    console.error("Error scraping image from page", url, e);
    return null;
  }
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
    const draft = await generateBlogTopicAndContent();
    const imageUrl = await fetchImageUrlFromPage(draft.sourceUrl);

    const insertResult = await pool.query(
      `INSERT INTO blog_posts
         (slug, title, excerpt, date, read_time, tags, featured_image, content, source, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'auto_ai', NOW())
       ON CONFLICT (slug) DO NOTHING RETURNING slug`,
      [
        draft.slug,
        draft.title,
        draft.excerpt,
        draft.date,
        draft.readTime,
        draft.tags || [],
        imageUrl,
        draft.content,
      ]
    );

    if (insertResult.rows.length > 0) created.push(draft.slug);
    else console.warn("Skipped insert due to slug conflict", draft.slug);
  }

  return { created };
}

// Background function: returns 202 immediately, runs up to 15 min in background
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  runGeneration()
    .then((result) => {
      if (result.done) console.log("blog-generate-daily:", result.message);
      else console.log("blog-generate-daily: created", result.created);
    })
    .catch((err) => console.error("blog-generate-daily error", err));

  return {
    statusCode: 202,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Blog generation started in background" }),
  };
};
