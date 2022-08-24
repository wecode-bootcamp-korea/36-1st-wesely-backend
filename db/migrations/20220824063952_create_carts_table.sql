-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_id INT NULL DEFAULT 0,
  quantity INT NULL DEFAULT 0,
  CONSTRAINT carts_users_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT carts_images_id_fkey FOREIGN KEY (image_id) REFERENCES images (id)
);

-- migrate:down
DROP TABLE carts;
