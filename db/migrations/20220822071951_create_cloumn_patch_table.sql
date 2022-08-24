-- migrate:up
ALTER TABLE carts ADD image_id INT NOT NULL;
ALTER TABLE users ADD name varchar(200) NOT NULL;

-- migrate:down

