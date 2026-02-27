const { Pool } = require("pg");

// Reuse a single pool across invocations in the same container
let cachedPool;

function getPool() {
  if (!cachedPool) {
    const connectionString = process.env.POSTGRES_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("POSTGRES_CONNECTION_STRING environment variable is not set");
    }

    cachedPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30000,
    });
  }
  return cachedPool;
}

module.exports = {
  getPool,
};

