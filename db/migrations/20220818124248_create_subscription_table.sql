-- migrate:up
CREATE TABLE subscription(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  period INT NOT NULL DEFAULT 0
);

-- migrate:down
DROP TABLE subscription;
