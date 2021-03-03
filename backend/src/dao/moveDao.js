import {pgClient} from "../pool.js";

const getMoves = async (id) => {
  return await pgClient.query(
    `SELECT * FROM move WHERE game_id = $1 ORDER BY moved_at ASC`,
      [id]
  );
};

const makeMove = async (id,from_i, from_j, to_i, to_j) => {
  return await pgClient.query(
    `INSERT INTO move (game_id, from_i, from_j, to_i, to_j) VALUES ($1, $2, $3, $4, $5)`,
      [id, from_i, from_j, to_i, to_j]
  );
};

export const moveDao = {
  getMoves,
  makeMove
};
