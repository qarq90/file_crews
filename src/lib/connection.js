import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_NEON_CONNECTION_STRING,
  ssl: true,
});

export default pool;
