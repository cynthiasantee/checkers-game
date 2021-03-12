import * as errorHandler from './errorHandler.js';

import dotenv from 'dotenv';
dotenv.config()

//Express App Setup
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";


//Config
import {pgClient} from "./pool.js"

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Controller imports
import playerController from "./controller/playerController.js"
import gameController from "./controller/gameController.js"
import moveController from "./controller/moveController.js"

app.use((req, res, next) => {
  const allowedOrigins = [
      'http://localhost:3001',
  ];
  

  if (allowedOrigins.includes(req.headers.origin)) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
  }    

  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Expose-Headers', 'Location');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT, GET');

  // Self built error handler
  res.errorHandler = errorHandler.handle(res);

  next();
});

// Create tables
pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS player (
    id SERIAL,
    email VARCHAR (320) UNIQUE NOT NULL,
    password VARCHAR (20) NOT NULL,
    username VARCHAR (30) UNIQUE NOT NULL,
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS game (
    id SERIAL,
    player_one_id INT NOT NULL,
    player_two_id INT,
    winner_id INT,
    player_one_color VARCHAR (7) NULL,
    player_two_color VARCHAR (7) NULL,
    turn INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(player_one_id) REFERENCES player(id),
    FOREIGN KEY(player_two_id) REFERENCES player(id),
    FOREIGN KEY(turn) REFERENCES player(id),
    FOREIGN KEY(winner_id) REFERENCES player(id)
  );

  CREATE TABLE IF NOT EXISTS move (
    game_id INT NOT NULL,
    from_i SMALLINT NOT NULL,
    from_j SMALLINT NOT NULL,
    to_i SMALLINT NOT NULL,
    to_j SMALLINT NOT NULL,
    moved_at timestamp without time zone default now(),
    FOREIGN KEY(game_id) REFERENCES game(id)
  );
`
  )
  .catch(err => console.log(err));

//Player subroute
app.use("/player", playerController);
//Game subroute
app.use("/game", gameController);
//Move subroute
app.use("/move", moveController);


// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));


// CREATE TABLE player (
//   id SERIAL,
//   email VARCHAR (320) UNIQUE NOT NULL,
//   username VARCHAR (30) UNIQUE NOT NULL,
//   PRIMARY KEY(id)
// );

// CREATE TABLE game (
//   id SERIAL,
//   player_one_id INT NOT NULL,
//   player_two_id INT NULL,
//   winner_id INT NULL,
//   PRIMARY KEY(id),
//   FOREIGN KEY(player_one_id) REFERENCES player(id),
//   FOREIGN KEY(player_two_id) REFERENCES player(id),
//   FOREIGN KEY(winner_id) REFERENCES player(id)
// );
  
// INSERT INTO player (email, username) VALUES ('a@gmail.com', 'a');
// INSERT INTO player (email, username) VALUES ('b@gmail.com', 'b'); 
// INSERT INTO player (email, username) VALUES ('c@gmail.com', 'c'); 
// INSERT INTO player (email, username) VALUES ('d@gmail.com', 'd');

// INSERT INTO game (player_one_id) VALUES (1);
// INSERT INTO game (player_one_id, player_two_id) VALUES (3, 4);
// INSERT INTO game (player_one_id, player_two_id, winner_id) VALUES (1, 4, 1);



// SELECT * FROM player;
// SELECT * FROM game;

// SELECT p1.id, p1.playerId as player1_ID, p1.username as player1_username, p2.playerId as player2_ID, p2.username as player2_username FROM
//   (
//     SELECT game.id, player.id as playerId, player.username from game JOIN player ON player.id = game.player_one_id
//   ) as p1
// FULL OUTER JOIN
//   (
// 	SELECT game.id, player.id as playerId, player.username from game JOIN player ON player.id = game.player_two_id
//   ) as p2
// ON p1.id = p2.id
