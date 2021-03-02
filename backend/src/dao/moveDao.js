import {pgClient} from "../pool.js";

const getMoves = async (id) => {
  return await pgClient.query(
    `SELECT * FROM move WHERE game_id = $1 ORDER BY moved_at ASC`,
      [id]
  );
};

const makeMove = async (id,from_x, from_y, to_x, to_y) => {
  return await pgClient.query(
    `INSERT INTO move (game_id, from_x, from_y, to_x, to_y) VALUES ($1, $2, $3, $4, $5)`,
      [id, from_x, from_y, to_x, to_y]
  );
};

export const moveDao = {
  getMoves,
  makeMove
};
