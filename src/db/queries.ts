import { pool } from "./pool";

export const getUsers = async function () {
  let query = "SELECT * FROM users";

  const { rows } = await pool.query(query);
  return rows;
};

export const isEmailValid = async function (email: string) {
  let query = "SELECT email FROM users WHERE email=$1";
  try {
    const { rows } = await pool.query(query, [email]);
    return rows.length <= 0;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async function (user: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  membership_status: string;
  admin: boolean;
}) {
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
