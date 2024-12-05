"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignupForm = exports.getHomePage = void 0;
const getHomePage = function (req, res) {
    res.render("index");
};
exports.getHomePage = getHomePage;
const getSignupForm = function (req, res) {
    res.render("sign-up", {
        title: "Sign Up",
    });
};
exports.getSignupForm = getSignupForm;
