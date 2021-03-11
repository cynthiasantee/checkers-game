import {pgClient} from "../pool.js";

const getGames = async () => {
  return await pgClient.query('SELECT p_one.id, p_one.player_id as player_one_id, p_one.username as player_one_username, p_two.player_id as player_two_id, p_two.username as player_two_username, p_one.winner_id, p_one.player_one_color, p_one.player_two_color, p_one.turn FROM(SELECT game.id, game.winner_id, game.player_one_color, game.player_two_color, game.turn, player.id as player_id, player.username from game JOIN player ON player.id = game.player_one_id) as p_one FULL OUTER JOIN (SELECT game.id, player.id as player_id, player.username from game JOIN player ON player.id = game.player_two_id) as p_two ON p_one.id = p_two.id');
};

const getGameById = async (id) => {
  return await pgClient.query(
    `SELECT p_one.id, p_one.player_id as player_one_id, p_one.username as player_one_username, p_two.player_id as player_two_id, p_two.username as player_two_username, p_one.winner_id, p_one.player_one_color, p_one.player_two_color, p_one.turn FROM(SELECT game.id, game.winner_id, game.player_one_color, game.player_two_color, game.turn, player.id as player_id, player.username from game JOIN player ON player.id = game.player_one_id) as p_one FULL OUTER JOIN (SELECT game.id, player.id as player_id, player.username from game JOIN player ON player.id = game.player_two_id) as p_two ON p_one.id = p_two.id WHERE p_one.id = $1`,
      [id]
  );
};

const createGame = async (player_one_id) => {
  return await pgClient.query(
    `INSERT INTO game (player_one_id, turn) VALUES ($1, $2) RETURNING id as new_game_id`,
      [player_one_id, player_one_id]
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

export const gameDao = {
  getGames,
  getGameById,
  createGame,
  setSecondPlayer,
  setWinner,
};