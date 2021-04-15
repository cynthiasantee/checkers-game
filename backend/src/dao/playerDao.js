import {pgClient} from "../pool.js";

const getPlayers = async () => {
 return await pgClient.query('SELECT * FROM player');
};

//get player by id
const getPlayer = async (id) => {
  return await pgClient.query(
    `SELECT * FROM player WHERE id = $1`,
      [id]
  );
};

//check email and password and return cookie
//get player by email
const getPlayerByEmail = async (email) => {
  return await pgClient.query(
    `SELECT * FROM player WHERE email = $1`,
      [email]
  );
};

const createPlayer = async (email, username, password) => {
  return await pgClient.query(
    `INSERT INTO player (email, username, password) VALUES ($1, $2, $3) RETURNING id`,
      [email, username, password]
  );
};

const emailCheck = async (email) => {
  return await pgClient.query(
    "SELECT email FROM player WHERE email = $1", 
      [email]
  );
}

const usernameCheck = async (username) => {
  return await pgClient.query(
    "SELECT username FROM player WHERE username = $1", 
      [username]
  );
}

const updatePassword = async (email, password) => {
  return await pgClient.query(
    "UPDATE player SET password = $2 WHERE email = $1",
      [email, password]
  );
};

const getPlayerWins = async (id) => {
  return await pgClient.query(
    `SELECT COUNT(winner_id) FROM game WHERE winner_id = $1`,
      [id]
  );
};

const getPlayerLosses = async (id) => {
  return await pgClient.query(
    `SELECT COUNT(id) FROM game WHERE winner_id IS NOT NULL AND (player_one_id = $1 OR player_two_id = $1) AND id != winner_id`,
      [id]
  );
};

export const playerDao = {
  getPlayers,
  getPlayer,
  createPlayer,
  emailCheck,
  usernameCheck,
  updatePassword,
  getPlayerWins,
  getPlayerLosses,
  getPlayerByEmail
};