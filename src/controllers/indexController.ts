import { Request, Response } from "express-serve-static-core";
import * as db from "../db/user.queries";

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
  res.json({
    data: {
      user: req.user,
    },
  });
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
