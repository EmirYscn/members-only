import { body } from "express-validator";
import * as db from "../db/queries";

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
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      console.log(user);
      if (user.length > 0) {
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
