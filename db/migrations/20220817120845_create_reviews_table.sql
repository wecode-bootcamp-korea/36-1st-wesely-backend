-- migrate:up
CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  users_id INT NOT NULL,
  products_id INT NOT NULL,
  rating INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE,
  UNIQUE KEY reviews_uk (users_id, products_id)
);

-- migrate:down
DROP TABLE reviews;
