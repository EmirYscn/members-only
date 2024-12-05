"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "emiryscn",
    host: "localhost",
    database: "membersonly",
    password: "21emir21",
    port: 5432,
});
