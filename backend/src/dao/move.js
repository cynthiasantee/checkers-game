import {pgClient} from "../pool.js";

const getMoves = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const moves = await pgClient.query(
      `SELECT * FROM move WHERE game_id = $1`,
      [id])

    res.status(200).send(moves.rows);
  } catch (err) {
    console.log(err)
      res
        .status(500)
        .send(`Encountered an internal error when fetching moves`);
  }
};

const makeMove = async (req, res) => {
  const { from_x, from_y, to_x, to_y } = req.body;
  const id = parseInt(req.params.id)

    try {
      await pgClient.query(
        `INSERT INTO move (game_id, from_x, from_y, to_x, to_y) VALUES ($1, $2, $3, $4, $5)`,
        [id, from_x, from_y, to_x, to_y])
  
        res.status(201).send(`Move added`);
    } catch (err) {
      console.log(err);
      res
      .status(500)
      .send('Encountered an internal error when making move');
    }

};

export const moveDAO = {
  getMoves,
  makeMove
};
