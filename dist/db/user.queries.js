"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMembership = exports.createUser = exports.findUser = exports.getUsers = void 0;
const pool_1 = require("./pool");
const getUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT * FROM users";
        const { rows } = yield pool_1.pool.query(query);
        return rows;
    });
};
exports.getUsers = getUsers;
const findUser = function (field, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = `SELECT * FROM users WHERE ${field}=$1`;
        try {
            const { rows } = yield pool_1.pool.query(query, [value]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            console.log(`Error finding user by ${field}: `, error);
            throw new Error("Database query failed");
        }
    });
};
exports.findUser = findUser;
const createUser = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "INSERT INTO users (firstName, lastName, email, username, password, membership_status, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        try {
            yield pool_1.pool.query(query, [
                user.firstName,
                user.lastName,
                user.email,
                user.username,
                user.password,
                user.membership_status,
                user.admin,
            ]);
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.createUser = createUser;
const setMembership = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "UPDATE users SET membership_status='member' WHERE user_id=$1";
        try {
            yield pool_1.pool.query(query, [id]);
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.setMembership = setMembership;
