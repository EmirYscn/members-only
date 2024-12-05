CREATE TABLE users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  membership_status TEXT NOT NULL,
  admin BOOLEAN
);



CREATE TABLE messages (
  message_id SERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP,
  message TEXT NOT NULL,
  user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE
);