import { Request, Response } from "express-serve-static-core";
import * as db from "../db/user.queries";
import { User } from "../types/userModel";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const getHomePage = function (req: Request, res: Response) {
  res.render("index");
};

export const getSignupForm = function (req: Request, res: Response) {
  res.render("sign-up");
};

export const getLoginForm = function (req: Request, res: Response) {
  res.render("login");
};

export const getProfile = function (req: Request, res: Response) {
  res.render("profile_overview");
};

export const getMembership = function (req: Request, res: Response) {
  res.render("profile_membership");
};

export const leaveMembership = async function (req: Request, res: Response) {
  const currentUser = req.user;
  try {
    await db.leaveMembership((currentUser as User).user_id);
    res.redirect("/profile/membership");
  } catch (error) {
    console.log(error);
  }
};

export const getChangePassword = function (req: Request, res: Response) {
  res.render("profile_password");
};
export const changePassword = async function (req: Request, res: Response) {
  const currentUser = req.user;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("profile_password", {
      error: result.array(),
    });
  }
  const { currentPassword, password, passwordConfirm } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.editUser((currentUser as User).user_id, {
      password: hashedPassword,
    });
    res.redirect("/profile/overview");
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async function (req: Request, res: Response) {
  const currentUser = req.user;
  try {
    await db.editUser((currentUser as User).user_id, req.body);
    res.redirect("/profile/overview");
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = function (req: Request, res: Response) {
  res.json({
    data: {
      user: req.user,
    },
  });
};

export const getMember = function (req: Request, res: Response) {
  res.render("member");
};

export const setMember = async function (req: Request, res: Response) {
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
    await db.setMembership(currentUser.user_id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
