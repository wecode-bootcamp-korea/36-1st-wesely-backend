-- migrate:up
CREATE TABLE payments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  orders_id INT NOT NULL
);

-- migrate:down
DROP TABLE payments;
