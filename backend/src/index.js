import * as errorHandler from './errorHandler.js';
import { Server } from "socket.io";

import dotenv from 'dotenv';
dotenv.config()

//Express App Setup
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import expressSession from "express-session";

//Register Api
import { playerService } from "../src/service/playerService.js";
// const router = express.Router();

//Config
import {pgClient} from "./pool.js"
import passport from "./passport.js";

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};

// Initialization
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(expressSession({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

// Controller imports
import playerController from "./controller/playerController.js"
import gameController from "./controller/gameController.js"
import moveController from "./controller/moveController.js"

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
];

if (allowedOrigins.includes(req.headers.origin)) {

  res.header('Access-Control-Allow-Origin', req.headers.origin);
}

  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT, GET, OPTIONS');

  // Self built error handler
  res.errorHandler = errorHandler.handle(res);

  next();
});

// No further processing needed for options calls.
app.options('/*', (req, res) => {
  console.log('Handling any options request');
  res.status(200).end();
});



// Create tables
pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS player (
    id SERIAL,
    email VARCHAR (320) UNIQUE NOT NULL,
    password VARCHAR (900) NOT NULL,
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
    select_piece_i INT NULL,
    select_piece_j INT NULL,
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

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    var origin = req.get('Origin')
    res.send(origin + '/home/' + req.user.id);
});

//create player
app.post('/register', async (req, res) => {
  try {
      const player = await playerService.createPlayer(req.body.email, req.body.username, req.body.password);
      res.status(201).send(player).end();
  } catch(err) {
      return res.errorHandler(err);
  }
});

//update password
app.put('/update', async (req, res) => {
  try {
      await playerService.updatePassword(req.body.email, req.body.password);
      res.status(200).send("PASSWORD_UPDATED").end();
  } catch(err) {
      return res.errorHandler(err);
  }
});

//logout
app.get('/logout', function(req, res){
  req.logout();
  res.send('/');
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);


// Start websocket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  },
});

export const home = io.of("/home");
export const game = io.of("/game");

home.on("connection", async (socket) => {
  const ids = await home.allSockets();
  home.emit("users", Array.from(ids));

  socket.on("disconnect", async (reason) => {
    const ids = await home.allSockets();
    home.emit("users", Array.from(ids));
  });
});

game.on("connection", (socket) => {
  socket.on("join_game", async (gameId) => {
    const roomName = "game" + gameId;
    socket.join(roomName);

    const room = game.to(roomName);
    const players = await room.allSockets();

    room.emit("players_in_room", Array.from(players));
  });

  socket.on("disconnecting", async () => {
    const rooms = Array.from(socket.rooms).slice(1);
    const mySocketId = socket.id;

    socket.id;
    for (let i = 0; i < rooms.length; i++) {
      const curr = game.to(rooms[i]);
      const players = await curr.allSockets();
      curr.emit(
        "players_in_room",
        Array.from(players).filter((id) => id !== mySocketId)
      );
    }
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
