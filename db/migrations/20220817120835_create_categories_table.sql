-- migrate:up
CREATE TABLE categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_id INT NOT NULL,
  category VARCHAR(300) NOT NULL,
  FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE categories;
