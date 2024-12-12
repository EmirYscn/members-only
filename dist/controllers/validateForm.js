"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateForm = void 0;
const express_validator_1 = require("express-validator");
const db = __importStar(require("../db/user.queries"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.validateForm = [
    (0, express_validator_1.body)("firstname")
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("First name can not be less than 2 and more than 30 characters"),
    (0, express_validator_1.body)("lastname")
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("Last name can not be less than 2 and more than 30 characters"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db.findUser("email", value);
        console.log(user);
        if (user) {
            throw new Error("Email already in use");
        }
    })),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password can not be less than 8 characters"),
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
];
exports.validatePassword = [
    (0, express_validator_1.body)("currentPassword")
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("First name can not be less than 2 and more than 30 characters")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const isValid = yield bcryptjs_1.default.compare(value, req.user.password.toString());
        if (!isValid) {
            throw new Error("Password is not correct");
        }
    })),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password can not be less than 8 characters"),
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
];
