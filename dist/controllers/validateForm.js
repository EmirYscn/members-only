"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
const express_validator_1 = require("express-validator");
exports.validateForm = [
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("First name can not be less than 2 and more than 30 characters"),
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage("Last name can not be less than 2 and more than 30 characters"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password can not be less than 8 characters"),
];
