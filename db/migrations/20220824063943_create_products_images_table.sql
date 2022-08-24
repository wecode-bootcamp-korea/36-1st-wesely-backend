-- migrate:up
CREATE TABLE products_images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_id INT NOT NULL,
  CONSTRAINT products_images_products_id_fkey FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  CONSTRAINT products_images_images_id_fkey FOREIGN KEY (image_id) REFERENCES images (id)
);

-- migrate:down
DROP TABLE products_images;
