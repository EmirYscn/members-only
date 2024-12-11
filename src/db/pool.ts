import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";

const PgSession = connectPgSimple(session);

// PostgreSQL connection pool
export const pool = new Pool({
  user: "emiryscn",
  host: "localhost",
  database: "membersonly",
  password: "21emir21",
  port: 5432,
});

// Session middleware configuration
export const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "session",
  }),
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
});
