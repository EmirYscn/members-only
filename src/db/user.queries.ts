import { pool } from "./pool";

type User = {
  user_id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  membership_status: string;
  admin: boolean;
};

export const getUsers = async function () {
  let query = "SELECT * FROM users";

  const { rows } = await pool.query(query);
  return rows;
};

export const findUser = async function (
  field: "email" | "user_id" | "firstName" | "lastName" | "username",
  value: string,
): Promise<User | null> {
  let query = `SELECT * FROM users WHERE ${field}=$1`;
  try {
    const { rows } = await pool.query(query, [value]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log(`Error finding user by ${field}: `, error);
    throw new Error("Database query failed");
  }
};

export const createUser = async function (user: User) {
  let query =
    "INSERT INTO users (firstName, lastName, email, username, password, membership_status, admin) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  try {
    await pool.query(query, [
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.password,
      user.membership_status,
      user.admin,
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const setMembership = async function (id: string) {
  let query = "UPDATE users SET membership_status='member' WHERE user_id=$1";
  try {
    await pool.query(query, [id]);
  } catch (error) {
    console.log(error);
  }
};
