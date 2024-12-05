import { body } from "express-validator";

export const validateForm = [
  body("firstName")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "First name can not be less than 2 and more than 30 characters",
    ),
  body("lastName")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Last name can not be less than 2 and more than 30 characters",
    ),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
];
