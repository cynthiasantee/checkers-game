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

const setSecondPlayer = async (player_two_id, id) => {
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

// games that someone else started and I can join
const getOpenGames = async (myId) => {
  return await pgClient.query(
    "SELECT * FROM game WHERE player_two_id IS NULL AND player_one_id != $1", 
      [myId]
  );
};

// games that I am a participant, but haven't ended
const getMyCurrGames = async (myId) => {
  return await pgClient.query(
    "SELECT * FROM game WHERE (player_two_id = $1 OR player_one_id = $2) AND player_two_id IS NOT NULL AND player_one_id IS NOT NULL AND winner_id IS NULL", 
      [myId, myId]
  );
};

// games that I created, but no one joined
const getMyEmptyGames = async (myId) => {
  return await pgClient.query(
    "SELECT * FROM game WHERE player_one_id = $1 AND player_two_id IS NULL AND winner_id IS NULL", 
      [myId]
  );
};

export const gameDao = {
  getGames,
  getGameById,
  createGame,
  setSecondPlayer,
  setWinner,
  getOpenGames,
  getMyCurrGames,
  getMyEmptyGames
};