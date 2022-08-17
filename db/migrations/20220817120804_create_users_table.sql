-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(300) NOT NULL,
  password VARCHAR(2000) NOT NULL,
  phone_number VARCHAR(300) NOT NULL,
  point DECIMAL NOT NULL,
  subscription VARCHAR(300) NOT NULL
);

-- migrate:down
DROP TABLE users;
