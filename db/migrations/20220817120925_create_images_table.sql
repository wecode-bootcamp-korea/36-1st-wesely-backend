-- migrate:up
CREATE TABLE images(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  options VARCHAR(300) NULL,
  img_url VARCHAR(2000) NULL
);

-- migrate:down
DROP TABLE images;
