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
exports.deleteMessage = exports.createMessage = exports.getAllMessages = void 0;
const pool_1 = require("./pool");
const getAllMessages = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT messages.message_id, messages.title, messages.created_at, messages.message, users.user_id, users.username FROM messages JOIN users ON messages.user_id = users.user_id ORDER BY messages.created_at DESC";
        try {
            const { rows } = yield pool_1.pool.query(query);
            return rows;
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.getAllMessages = getAllMessages;
const createMessage = function (message) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3)";
        try {
            yield pool_1.pool.query(query, [message.title, message.message, message.user_id]);
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.createMessage = createMessage;
const deleteMessage = function (messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "DELETE FROM messages WHERE message_id=$1";
        try {
            yield pool_1.pool.query(query, [messageId]);
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.deleteMessage = deleteMessage;
