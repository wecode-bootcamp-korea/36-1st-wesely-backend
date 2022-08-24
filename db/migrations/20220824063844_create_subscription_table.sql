-- migrate:up
CREATE TABLE subscription(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  period varchar(200) NOT NULL 
);

-- migrate:down
DROP TABLE subscription;
