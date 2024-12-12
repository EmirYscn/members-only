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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validateForm_1 = require("../controllers/validateForm");
const indexController = __importStar(require("../controllers/indexController"));
const authController = __importStar(require("../controllers/authController"));
const messagesController = __importStar(require("../controllers/messagesController"));
require("../strategies/passport.mw");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
exports.router = router;
router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
router.get("/", messagesController.getMessages, indexController.getHomePage);
router
    .route("/signup")
    .get(indexController.getSignupForm)
    .post(validateForm_1.validateForm, authController.signupUser);
router
    .route("/login")
    .get(indexController.getLoginForm)
    .post(passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
}));
router
    .route("/profile/overview")
    .get(authController.isAuth, indexController.getProfile)
    .patch(authController.isAuth, indexController.editProfile);
router
    .route("/profile/membership")
    .get(authController.isAuth, indexController.getMembership)
    .patch(authController.isAuth, indexController.leaveMembership);
router
    .route("/profile/changePassword")
    .get(authController.isAuth, indexController.getChangePassword)
    .patch(authController.isAuth, validateForm_1.validatePassword, indexController.changePassword);
router.get("/dashboard", authController.isAuth, authController.isAdmin, indexController.getDashboard);
router
    .route("/member")
    .get(authController.isAuth, indexController.getMember)
    .post(indexController.setMember);
router.post("/message", authController.isAuth, messagesController.createMessage);
router.delete("/message/:messageId", authController.isAdmin, messagesController.deleteMessage);
router.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/");
    });
});
