import { NextFunction, Request, Response } from "express-serve-static-core";
import * as db from "../db/messages.queries";
import { User } from "../types/userModel";

export const getMessages = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const messages = await db.getAllMessages();
  res.locals.messages = messages;
  next();
};

export const createMessage = async function (req: Request, res: Response) {
  const { title, message } = req.body;
  const userId = (req.user as User).user_id;
  const newMessage = {
    title,
    message,
    user_id: userId,
  };
  try {
    await db.createMessage(newMessage);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async function (req: Request, res: Response) {
  const { messageId } = req.params;
  try {
    await db.deleteMessage(messageId);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
