import { Pool } from "pg";

export const pool = new Pool({
  user: "emiryscn",
  host: "localhost",
  database: "membersonly",
  password: "21emir21",
  port: 5432,
});
