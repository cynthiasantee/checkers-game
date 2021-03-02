import playerController from "./controller/playerController.js"
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

// Dao imports
import {playerDao} from "./dao/playerDao.js";
import {gameDao} from "./dao/gameDao.js";
import {moveDao} from "./dao/moveDao.js";

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
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS game (
    id SERIAL,
    player_one_id INT NOT NULL,
    player_two_id INT,
    winner_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(player_one_id) REFERENCES player(id),
    FOREIGN KEY(player_two_id) REFERENCES player(id),
    FOREIGN KEY(winner_id) REFERENCES player(id)
  );

  CREATE TABLE IF NOT EXISTS move (
    game_id INT NOT NULL,
    from_x SMALLINT NOT NULL,
    from_y SMALLINT NOT NULL,
    to_x SMALLINT NOT NULL,
    to_y SMALLINT NOT NULL,
    moved_at timestamp without time zone default now(),
    FOREIGN KEY(game_id) REFERENCES game(id)
  );
`
  )
  .catch(err => console.log(err));

//Player subroute
app.use("/player", playerController);

//Dao game
app.get("/games", gameDao.getGames);
app.get("/game/:id", gameDao.getGameById);
app.post("/game", gameDao.createGame);
app.put("/game/:id/player", gameDao.setSecondPlayer);
app.put("/game/:id/winner", gameDao.setWinner);

//Dao move
app.get("/moves/:id", moveDao.getMoves);
app.post("/move/:id", moveDao.makeMove);

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));