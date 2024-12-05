import { Request, Response } from "express";
import * as db from "../db/queries";
import { createUserDto } from "../dtos/createUser.dto";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

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
  let { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const username = email.split("@")[0];
  const newUser = {
    firstName,
    lastName,
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

export const login = async function (req: Request, res: Response) {};
