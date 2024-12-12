import { body } from "express-validator";
import * as db from "../db/user.queries";
import bcrypt from "bcryptjs";

export const validateForm = [
  body("firstname")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "First name can not be less than 2 and more than 30 characters",
    ),
  body("lastname")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Last name can not be less than 2 and more than 30 characters",
    ),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUser("email", value);
      console.log(user);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validatePassword = [
  body("currentPassword")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "First name can not be less than 2 and more than 30 characters",
    )
    .custom(async (value, { req }) => {
      const isValid = await bcrypt.compare(value, req.user.password.toString());
      if (!isValid) {
        throw new Error("Password is not correct");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
