import {pgClient} from "../pool.js";

const getGames = async () => {
  return await pgClient.query(`
  SELECT p_one.id, p_one.player_id as player_one_id, p_one.username as player_one_username, p_two.player_id as player_two_id, p_two.username as player_two_username, p_one.winner_id, p_one.player_one_color, p_one.player_two_color, p_one.turn
    FROM(
      SELECT game.id, game.winner_id, game.player_one_color, game.player_two_color, game.turn, player.id as player_id, player.username 
      FROM game JOIN player ON player.id = game.player_one_id
    ) as p_one
    FULL OUTER JOIN (
      SELECT game.id, player.id as player_id, player.username 
      FROM game JOIN player ON player.id = game.player_two_id
    ) as p_two
    ON p_one.id = p_two.id`);
};

//almost the same as above
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

const setTurn = async (other_player_id, game_id) => {
  return await pgClient.query(
    "UPDATE game SET turn = $1 WHERE id = $2 RETURNING turn",
      [other_player_id, game_id]
  );
};

const setColors = async (player_one_id, player_id, color, game_id) => {
  return await pgClient.query(
    "UPDATE game SET player_one_color = $1, player_two_color = $2 WHERE id = $3",
      [
        player_id === player_one_id ? color : color === "white" ? "black" : "white",
        player_id !== player_one_id ? color : color === "white" ? "black" : "white",
        game_id
       ]
  );
};

export const gameDao = {
  getGames,
  getGameById,
  createGame,
  setSecondPlayer,
  setWinner,
  setTurn,
  setColors,
};