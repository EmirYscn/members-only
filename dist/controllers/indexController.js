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
exports.setMember = exports.getMember = exports.getDashboard = exports.editProfile = exports.changePassword = exports.getChangePassword = exports.leaveMembership = exports.getMembership = exports.getProfile = exports.getLoginForm = exports.getSignupForm = exports.getHomePage = void 0;
const db = __importStar(require("../db/user.queries"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const getHomePage = function (req, res) {
    res.render("index");
};
exports.getHomePage = getHomePage;
const getSignupForm = function (req, res) {
    res.render("sign-up");
};
exports.getSignupForm = getSignupForm;
const getLoginForm = function (req, res) {
    res.render("login");
};
exports.getLoginForm = getLoginForm;
const getProfile = function (req, res) {
    res.render("profile_overview");
};
exports.getProfile = getProfile;
const getMembership = function (req, res) {
    res.render("profile_membership");
};
exports.getMembership = getMembership;
const leaveMembership = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = req.user;
        try {
            yield db.leaveMembership(currentUser.user_id);
            res.redirect("/profile/membership");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.leaveMembership = leaveMembership;
const getChangePassword = function (req, res) {
    res.render("profile_password");
};
exports.getChangePassword = getChangePassword;
const changePassword = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = req.user;
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.render("profile_password", {
                error: result.array(),
            });
        }
        const { currentPassword, password, passwordConfirm } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        try {
            yield db.editUser(currentUser.user_id, {
                password: hashedPassword,
            });
            res.redirect("/profile/overview");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.changePassword = changePassword;
const editProfile = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = req.user;
        try {
            yield db.editUser(currentUser.user_id, req.body);
            res.redirect("/profile/overview");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.editProfile = editProfile;
const getDashboard = function (req, res) {
    res.json({
        data: {
            user: req.user,
        },
    });
};
exports.getDashboard = getDashboard;
const getMember = function (req, res) {
    res.render("member");
};
exports.getMember = getMember;
const setMember = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = req.body;
        const secretPassword = process.env.SECRET_CODE;
        if (password !== secretPassword) {
            res.render("member", {
                error: "Wrong password",
            });
        }
        const currentUser = req.user;
        console.log(currentUser);
        try {
            yield db.setMembership(currentUser.user_id);
            res.redirect("/");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.setMember = setMember;
