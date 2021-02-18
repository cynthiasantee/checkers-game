import dotenv from 'dotenv';
dotenv.config()

//Express App Setup
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import PG from 'pg';
const Pool = PG.Pool;

//Config
import {config} from "./config/index.js";

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

export const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
  .query(
    `
  CREATE TABLE IF NOT EXISTS player (
    id SERIAL,
    email VARCHAR (320) UNIQUE NOT NULL,
    password VARCHAR (20) NOT NULL,
    PRIMARY KEY(id)
  )
`
  )
  .catch(err => console.log(err));

// Express route handlers
app.get('/test', (_, res) => {
  res.send('Working!');
});


import {playerDAO} from "./dao/player.js";


app.get("/", (_, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/players", playerDAO.getPlayers);
app.get("/player/:id", playerDAO.getPlayerById);
app.post("/player", playerDAO.createPlayer);
app.put("/player/:id", playerDAO.updatePassword);
app.delete("/player/:id", playerDAO.deletePlayer);

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));