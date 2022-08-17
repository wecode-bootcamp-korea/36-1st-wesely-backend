-- migrate:up
CREATE TABLE products_img(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_id INT NOT NULL,
  img_id INT NOT NULL,
  FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE products_img;
