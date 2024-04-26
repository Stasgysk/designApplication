DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS components CASCADE;
DROP TABLE IF EXISTS added_components CASCADE;

DO
$$
    BEGIN
        CREATE DOMAIN user_name AS
            VARCHAR NOT NULL CHECK (value !~ '\s');
        CREATE DOMAIN file_location AS
            VARCHAR NOT NULL CHECK (value !~ '\s');
--         CREATE TYPE ContentState AS ENUM ('published', 'private', 'friendsOnly');
--
--         CREATE TYPE ContentType AS ENUM ('photo', 'reel', 'story');
--
--         CREATE TYPE PromotionType AS ENUM ('video', 'picture', 'text');

        --     CREATE TYPE PromotionContent AS (
--         id INT,
--         text VARCHAR,
--         video_url VARCHAR
--     );

--         CREATE TYPE InterestsType AS ENUM ('photography', 'cars', 'women', 'sport', 'pcGames', 'fashion');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

CREATE TABLE IF NOT EXISTS users
(
    id INT8 DEFAULT nextval('users_id_seq') PRIMARY KEY,
    user_name user_name NOT NULL UNIQUE,
    firstname user_name,
    surname user_name,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_settings JSONB,
    phone_number VARCHAR(15),
    gender VARCHAR(5),
    age INT
);

CREATE TABLE IF NOT EXISTS projects
(
    id SERIAL PRIMARY KEY,
    project_file BYTEA NOT NULL,
    name VARCHAR(20) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS components
(
    id SERIAL PRIMARY KEY,
    component_file BYTEA NOT NULL,
    name VARCHAR(20),
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS added_components
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    component_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (component_id) REFERENCES components(id)
);

CREATE TABLE IF NOT EXISTS passwords
(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    password VARCHAR(4000) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

