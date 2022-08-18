-- migrate:up
CREATE TABLE orders_products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_price DECIMAL(6,0) NOT NULL,
  CONSTRAINT orders_products_carts_id_fkey FOREIGN KEY (cart_id) REFERENCES carts (id)
);

-- migrate:down
DROP TABLE orders_products;
