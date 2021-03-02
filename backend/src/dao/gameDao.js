import {pgClient} from "../pool.js";

const getGames = async () => {
  return await pgClient.query('SELECT * FROM game');
};
  
const getGameById = async (id) => {
  return await pgClient.query(
    `SELECT * FROM game WHERE id = $1`,
      [id]
  );
};

const createGame = async (player_one_id) => {
  return await pgClient.query(
    `INSERT INTO game (player_one_id) VALUES ($1) RETURNING id as new_game_id`,
      [player_one_id]
  );
};

const setSecondPlayer = async (id, player_two_id) => {
  return await pgClient.query(
    "UPDATE game SET player_two_id = $1 WHERE id = $2",
      [player_two_id, id]
  );
};

const setWinner = async (id, winner_id) => {
  return await pgClient.query(
    "UPDATE game SET winner_id = $1 WHERE id = $2",
      [winner_id, id]
  );
};

export const gameDao = {
  getGames,
  getGameById,
  createGame,
  setSecondPlayer,
  setWinner,
};