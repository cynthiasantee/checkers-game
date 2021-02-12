CREATE TABLE player (
    id SERIAL,
    email VARCHAR (320) UNIQUE NOT NULL,
    password VARCHAR (20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE game (
    id SERIAL,
    player_one_id INT NOT NULL,
    player_two_id INT NOT NULL,
    winner_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(player_one_id) REFERENCES player(id),
    FOREIGN KEY(player_two_id) REFERENCES player(id),
    FOREIGN KEY(winner_id) REFERENCES player(id)
);

CREATE TABLE piece_move (
    game_id INT NOT NULL,
    from_x SMALLINT NOT NULL,
    from_y SMALLINT NOT NULL,
    to_x SMALLINT NOT NULL,
    to_y SMALLINT NOT NULL,
    moved_at timestamp without time zone default now(),
    FOREIGN KEY(game_id) REFERENCES game(id)
);

INSERT INTO player VALUES (DEFAULT, 'kai@gmail.com', 'password');
INSERT INTO player VALUES(DEFAULT, 'pixie@gmail.com', 'password');