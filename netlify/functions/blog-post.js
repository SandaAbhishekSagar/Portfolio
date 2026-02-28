const { getPool } = require("./db");

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const slug = event.queryStringParameters?.slug;

  if (!slug) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing slug parameter" }),
    };
  }

  try {
    const pool = getPool();

    const { rows } = await pool.query(
      `
      SELECT
        slug,
        title,
        excerpt,
        date,
        read_time AS "readTime",
        tags,
        content
      FROM blog_posts
      WHERE slug = $1
      LIMIT 1
    `,
      [slug]
    );

    if (rows.length === 0) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Post not found" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: rows[0] }),
    };
  } catch (err) {
    console.error("blog-post error", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load blog post" }),
    };
  }
};

