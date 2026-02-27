// Netlify Function to handle newsletter signups and store emails in a database.
// This implementation is database-agnostic but includes a concrete example for Supabase.
// Configure your environment variables on Netlify:
// - SUPABASE_URL
// - SUPABASE_ANON_KEY
//
// And create a table like:
//   newsletter_subscribers (id uuid default uuid_generate_v4(), email text unique, source text, created_at timestamptz default now())

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { email, source = "blog" } = JSON.parse(event.body || "{}");

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Supabase environment variables are not configured");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Newsletter service not configured" }),
      };
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ email, source }),
    });

    if (!response.ok && response.status !== 409) {
      // 409 = conflict (e.g., email already exists); treat as success from UX standpoint
      const text = await response.text();
      console.error("Supabase insert error", response.status, text);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to save subscription" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Newsletter signup function error", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

