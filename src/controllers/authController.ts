import { Request, Response } from "express";
import * as db from "../db/queries";
import { createUserDto } from "../dtos/createUser.dto";
import { validationResult } from "express-validator";

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
  const { firstName, lastName, email, password } = req.body;

  if (!(await db.isEmailValid(email))) {
    return res.render("sign-up", {
      error: "Email already in use.",
    });
  }

  // TODO: bcrypt password
  const username = email.split("@")[0];
  const newUser = {
    firstName,
    lastName,
    email,
    username,
    password,
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

export const login = async function (req: Request, res: Respond) {};
