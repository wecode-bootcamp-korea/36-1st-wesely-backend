-- migrate:up
CREATE TABLE orders_item(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_id INT NOT NULL,
  orders_id INT NOT NULL,
  orders_item_status INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL NOT NULL,
  FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE orders_item;
