-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_item_id INT NOT NULL,
  order_status_id INT NOT NULL,
  subscription_id INT NULL,
  order_code INT NOT NULL,
  subscription_start_date TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT orders_orders_products_id_fkey FOREIGN KEY (order_item_id) REFERENCES order_items (id),
  CONSTRAINT orders_orders_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES orders_status (id),
  CONSTRAINT orders_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscription (id)
);

-- migrate:down
DROP TABLE orders;
