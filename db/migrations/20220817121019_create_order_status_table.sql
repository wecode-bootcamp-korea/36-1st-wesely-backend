-- migrate:up
CREATE TABLE order_status(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(300) NOT NULL DEFAULT "pending"
);

-- migrate:down
DROP TABLE order_status;
