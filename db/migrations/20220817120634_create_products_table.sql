-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_name VARCHAR(300) NOT NULL,
  price DECIMAL NOT NULL,
  description VARCHAR(100) NOT NULL,
  desc_img_url VARCHAR(2000) NOT NULL,
  thumb_img_url VARCHAR(2000) NOT NULL,
  seller_name VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE products;
