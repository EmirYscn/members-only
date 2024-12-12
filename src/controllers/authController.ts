import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import * as db from "../db/user.queries";
import { createUserDto } from "../dtos/createUser.dto";
import { Form, User } from "../types/userModel";

export const signupUser = async function (
  req: Request<{}, {}, createUserDto>,
  res: Response,
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("sign-up", {
      body: { ...req.body, password: null },
      error: result.array(),
    });
  }
  let { firstname, lastname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const username = email.split("@")[0];
  const newUser = {
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
    membership_status: "regular",
    admin: false,
  };

  try {
    await db.createUser(newUser);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ msg: "You are not authorized" });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User).admin) next();
  else res.status(401).json({ msg: "You are not authorized" });
};
