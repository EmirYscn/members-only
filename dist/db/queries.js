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
exports.createUser = exports.isEmailValid = exports.getUsers = void 0;
const pool_1 = require("./pool");
const getUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT * FROM users";
        const { rows } = yield pool_1.pool.query(query);
        return rows;
    });
};
exports.getUsers = getUsers;
const isEmailValid = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT email FROM users WHERE email=$1";
        try {
            const { rows } = yield pool_1.pool.query(query, [email]);
            return rows.length <= 0;
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.isEmailValid = isEmailValid;
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
