import {pgClient} from "../pool.js";

const getPlayers = async () => {
 return await pgClient.query('SELECT * FROM player');
};

const getPlayer = async (id) => {
  return await pgClient.query(
    `SELECT * FROM player WHERE id = $1`,
      [id]
  );
};

const createPlayer = async (email, password) => {
  return await pgClient.query(
    `INSERT INTO player (email, password) VALUES ($1, $2)`,
      [email, password]
  );
};

const emailCheck = async (email) => {
  return await pgClient.query(
    "SELECT email FROM player WHERE email = $1", 
      [email]
  );
}

const updatePassword = async (id, email, password) => {
  return await pgClient.query(
    "UPDATE player SET email = $1, password = $2 WHERE id = $3",
      [email, password, id]
  );
};

const getPlayerWins = async (id) => {
  return await pgClient.query(
    `SELECT COUNT(winner_id) FROM game WHERE winner_id = $1`,
      [id]
  );
};

const getPlayerTotalGames = async (id) => {
  return await pgClient.query(
    `SELECT COUNT(id) FROM game WHERE player_one_id = $1 OR player_two_id = $1`,
      [id]
  );
};

export const playerDao = {
  getPlayers,
  getPlayer,
  createPlayer,
  emailCheck,
  updatePassword,
  getPlayerWins,
  getPlayerTotalGames
};