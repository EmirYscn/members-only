import { Request, Response } from "express";

export const getHomePage = function (req: Request, res: Response) {
  res.render("index");
};

export const getSignupForm = function (req: Request, res: Response) {
  res.render("sign-up");
};
