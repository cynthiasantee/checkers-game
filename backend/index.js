// const express = require( "express" );
// const app = express();
// const port = 8080; // default port to listen

// // define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );

// // start the Express server
// app.listen( port, () => {
//     console.log( `server started at http://localhost:${ port }` );
// } );

// import { client } from "./src/dao/player";
import express from "express";
import bodyParser from "body-parser";
import {playerDAO} from "./src/dao/player.js";
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/players", playerDAO.getPlayers);
app.get("/player/:id", playerDAO.getPlayerById);
app.post("/player", playerDAO.createPlayer);
app.put("/player/:id", playerDAO.updatePassword);
app.delete("/player/:id", playerDAO.deletePlayer);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// const execute = async () => {
//   try {
//     await client.connect();
//     console.log("connected!");
//     const players = await client.query("SELECT * FROM player");
//     console.table(players.rows);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.end();
//   }
// };

// execute();
