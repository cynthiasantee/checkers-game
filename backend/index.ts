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

import { client } from "./src/dao/client";

const execute = async () => {
  try {
    await client.connect();
    console.log("connected!");
    const players = await client.query("SELECT * FROM player");
    console.table(players.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

execute();
