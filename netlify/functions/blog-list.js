const { getPool } = require("./db");

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const pool = getPool();

    // Expected table schema (simplified):
    // CREATE TABLE blog_posts (
    //   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    //   slug text UNIQUE NOT NULL,
    //   title text NOT NULL,
    //   excerpt text NOT NULL,
    //   date text NOT NULL,
    //   read_time text NOT NULL,
    //   tags text[] NOT NULL,
    //   featured_image text,
    //   content text NOT NULL,
    //   source text DEFAULT 'manual',
    //   published_at timestamptz DEFAULT now()
    // );

    const { rows } = await pool.query(
      `
      SELECT
        slug,
        title,
        excerpt,
        date,
        read_time AS "readTime",
        tags,
        featured_image AS "featuredImage"
      FROM blog_posts
      ORDER BY published_at DESC
      LIMIT 30
    `
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts: rows }),
    };
  } catch (err) {
    console.error("blog-list error", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to load blog posts" }),
    };
  }
};

