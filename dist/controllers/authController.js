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
exports.isAdmin = exports.isAuth = exports.signupUser = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db = __importStar(require("../db/user.queries"));
const signupUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.render("sign-up", {
                body: Object.assign(Object.assign({}, req.body), { password: null }),
                error: result.array(),
            });
        }
        let { firstname, lastname, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const username = email.split("@")[0];
        const newUser = {
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
            membership_status: "regular",
            admin: false,
        };
        try {
            yield db.createUser(newUser);
            res.redirect("/login");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.signupUser = signupUser;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.status(401).json({ msg: "You are not authorized" });
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    if (req.user.admin)
        next();
    else
        res.status(401).json({ msg: "You are not authorized" });
};
exports.isAdmin = isAdmin;
