import express, { Request, Response } from "express";
import { validateForm, validatePassword } from "../controllers/validateForm";

import * as indexController from "../controllers/indexController";
import * as authController from "../controllers/authController";
import * as messagesController from "../controllers/messagesController";

import "../strategies/passport.mw";
import passport from "passport";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

router.get("/", messagesController.getMessages, indexController.getHomePage);

router
  .route("/signup")
  .get(indexController.getSignupForm)
  .post(validateForm, authController.signupUser);

router
  .route("/login")
  .get(indexController.getLoginForm)
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
  );

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
  .patch(
    authController.isAuth,
    validatePassword,
    indexController.changePassword,
  );

router.get(
  "/dashboard",
  authController.isAuth,
  authController.isAdmin,
  indexController.getDashboard,
);

router
  .route("/member")
  .get(authController.isAuth, indexController.getMember)
  .post(indexController.setMember);

router.post(
  "/message",
  authController.isAuth,
  messagesController.createMessage,
);
router.delete(
  "/message/:messageId",
  authController.isAdmin,
  messagesController.deleteMessage,
);

router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/");
  });
});

export { router };
