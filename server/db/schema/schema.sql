DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS boards_members CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS boards CASCADE;

CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) UNIQUE,
    password VARCHAR (255),
    PRIMARY KEY(user_id),
    UNIQUE (name, password)
);

CREATE TABLE IF NOT EXISTS boards (
    board_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255),
    owner INT,
    PRIMARY KEY(board_id),
    CONSTRAINT fk_user FOREIGN KEY(owner) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id  INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    description VARCHAR (5000),
    severity INT,
    board_column INT DEFAULT 0,
    board INT,
    PRIMARY KEY(task_id),
    CONSTRAINT fk_board FOREIGN KEY(board) REFERENCES boards(board_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS boards_members (
    board_id INT,
    user_id INT,
    PRIMARY KEY(board_id,user_id),
    CONSTRAINT fk_board FOREIGN KEY(board_id) REFERENCES boards(board_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);