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

// DAO imports
import {playerDAO} from "./dao/player.js";
import {gameDAO} from "./dao/game.js";
import {moveDAO} from "./dao/move.js";

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

//DAO player
app.get("/players", playerDAO.getPlayers);
app.get("/player/:id", playerDAO.getPlayerById);
app.get("/player/:id/wins", playerDAO.getPlayerWins);
app.get("/player/:id/total", playerDAO.getPlayerTotalGames);
app.post("/player", playerDAO.createPlayer);
app.put("/player/:id", playerDAO.updatePassword);
app.delete("/player/:id", playerDAO.deletePlayer);

//DAO game
app.get("/games", gameDAO.getGames);
app.get("/game/:id", gameDAO.getGameById);
app.post("/game", gameDAO.createGame);
app.put("/game/:id/player", gameDAO.setSecondPlayer);
app.put("/game/:id/winner", gameDAO.setWinner);

//DAO move
app.get("/moves/:id", moveDAO.getMoves);
app.post("/move/:id", moveDAO.makeMove);

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));