"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = exports.pool = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const PgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
// PostgreSQL connection pool
exports.pool = new pg_1.Pool({
    user: "emiryscn",
    host: "localhost",
    database: "membersonly",
    password: "21emir21",
    port: 5432,
});
// Session middleware configuration
exports.sessionMiddleware = (0, express_session_1.default)({
    store: new PgSession({
        pool: exports.pool,
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
