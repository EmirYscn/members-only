import express, { Request, Response } from "express";
import { validateForm } from "../controllers/validateForm";

import * as indexController from "../controllers/indexController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get("/", indexController.getHomePage);

router
  .route("/signup")
  .get(indexController.getSignupForm)
  .post(validateForm, authController.signupUser);

// router
//   .route("/login")
//   .get(indexController.getLoginForm)
//   .post(authController.login);

export { router };
