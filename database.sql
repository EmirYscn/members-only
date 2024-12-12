CREATE TABLE users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  membership_status TEXT NOT NULL,
  admin BOOLEAN
);

CREATE TABLE messages (
  message_id SERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  message TEXT NOT NULL,
  user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE
);

INSERT INTO messages (title, message, user_id) VALUES ('My title', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error explicabo repellendus voluptatibus architecto minima sunt non cumque id facilis repudiandae, porro omnis saepe mollitia, rerum hic ex vel dignissimos dolores.', 15);