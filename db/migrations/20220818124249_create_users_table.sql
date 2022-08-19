-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(500) NOT NULL,
  password VARCHAR(2000) NOT NULL,
  phone_number VARCHAR(300) NOT NULL,
  point DECIMAL(6,0) UNSIGNED NOT NULL DEFAULT 100000,
  CONSTRAINT user_email UNIQUE (email)
);

-- migrate:down
DROP TABLE users;
