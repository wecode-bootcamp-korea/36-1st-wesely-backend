-- migrate:up
CREATE TABLE order_items(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  total_price DECIMAL(6,0) NOT NULL,
  CONSTRAINT order_items_carts_id_fkey FOREIGN KEY (cart_id) REFERENCES carts (id)
);

-- migrate:down
DROP TABLE order_items;
