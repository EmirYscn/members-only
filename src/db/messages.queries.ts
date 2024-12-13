import { pool } from "./pool";

type Message = {
  message_id?: string;
  title: string;
  created_at?: Date;
  message: string;
  user_id: string | undefined;
};

export const getAllMessages = async function (): Promise<
  Message[] | undefined
> {
  let query =
    "SELECT messages.message_id, messages.title, messages.created_at, messages.message, users.user_id, users.username FROM messages JOIN users ON messages.user_id = users.user_id ORDER BY messages.created_at DESC";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async function (message: Message) {
  let query =
    "INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3)";

  try {
    await pool.query(query, [message.title, message.message, message.user_id]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async function (messageId: string) {
  let query = "DELETE FROM messages WHERE message_id=$1";
  try {
    await pool.query(query, [messageId]);
  } catch (error) {
    console.log(error);
  }
};
