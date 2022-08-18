-- migrate:up
CREATE TABLE orders_users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  cart_id INT NOT NULL,
  order_status_id INT NOT NULL DEFAULT 1,
  subscription_id INT NOT NULL DEFAULT 1,
  order_code INT NOT NULL,
  subscription_start_date TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT orders_users_carts_id_fkey FOREIGN KEY (cart_id) REFERENCES carts (id),
  CONSTRAINT orders_users_orders_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES orders_status (id),
  CONSTRAINT orders_users_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscription (id)
);

-- migrate:down
DROP TABLE orders_users;
