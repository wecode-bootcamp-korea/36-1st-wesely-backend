-- migrate:up
CREATE TABLE orders_status(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_id INT NOT NULL
);

-- migrate:down
DROP TABLE orders_status;
