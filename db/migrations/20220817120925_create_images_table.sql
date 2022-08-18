-- migrate:up
CREATE TABLE images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  options VARCHAR(300) NULL DEFAULT NULL,
  image_url VARCHAR(2000) NOT NULL
);

-- migrate:down
DROP TABLE images;
