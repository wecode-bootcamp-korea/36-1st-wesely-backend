-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  product_information_id INT NOT NULL,
  name VARCHAR(300) NOT NULL,
  price DECIMAL(6,0) NOT NULL,
  description VARCHAR(500) NOT NULL,
  seller_name VARCHAR(200) NOT NULL,
  description_image_url VARCHAR(2000) NOT NULL,
  thumb_image_url VARCHAR(2000) NOT NULL,
  CONSTRAINT products_categories_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id),
  CONSTRAINT products_products_information_id_fkey FOREIGN KEY (product_information_id) REFERENCES products_information (id)
);

-- migrate:down
DROP TABLE products;
