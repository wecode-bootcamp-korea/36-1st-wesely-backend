-- migrate:up
CREATE TABLE order_items(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  image_id INT NOT NULL,
  quantity INT NULL DEFAULT 0,
  CONSTRAINT order_items_carts_id_fkey FOREIGN KEY (cart_id) REFERENCES carts (id),
  CONSTRAINT order_items_images_id_fkey FOREIGN KEY (image_id) REFERENCES images (id) 
);

-- migrate:down
DROP TABLE order_items;
