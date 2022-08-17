-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  users_id INT NOT NULL,
  products_id INT NOT NULL,
  orders_item_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE carts;
