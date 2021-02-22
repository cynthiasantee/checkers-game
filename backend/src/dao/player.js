import {pgClient} from "../pool.js";

const getPlayers = async (_, res) => {
  try {
    const players = await pgClient.query('SELECT * FROM player');
    res.status(200).send(players.rows);
  } catch (err) {
    console.log(err)
      res
        .status(500)
        .send(`Encountered an internal error when fetching players`);
  }
};

const getPlayerById = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const player = await pgClient.query(
      `SELECT * FROM player WHERE id = $1`,
      [id])

    res.status(200).send(player.rows);
  } catch (err) {
    console.log(err)
      res
        .status(500)
        .send(`Encountered an internal error when fetching player`);
  }
};

const createPlayer = async (req, res) => {
  const { email, password } = req.body;
    try {
      await pgClient.query(
        `INSERT INTO player (email, password) VALUES ($1, $2)`,
        [email, password])
  
        res.status(201).send(`Player created`);
    } catch (err) {
      console.log(err);
      res
      .status(500)
      .send('This email account has already been registered');
    }

};

const updatePassword = async (req, res) => {
  const id = parseInt(req.params.id);
  const { email, password } = req.body;

  try {
    await pgClient.query(
      "UPDATE player SET email = $1, password = $2 WHERE id = $3",
      [email, password, id])
      res.status(200).send(`Player updated with ID: ${id}`);
  } catch (err) {
    console.log(err)
    res
    .status(500)
    .send('Encountered an internal error when updating an item');
  }
};

const deletePlayer = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await pgClient.query(
      "DELETE FROM player WHERE id = $1",
      [id])

      res.status(200).send(`Player deleted with ID: ${id}`);
  } catch (err) {
    console.log(err)
    res
    .status(500)
    .send('Encountered an internal error when deleting player');
  }
};

const getPlayerWins = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const player = await pgClient.query(
      `SELECT COUNT(winner_id) FROM game WHERE winner_id = $1`,
      [id])

    res.status(200).send(player.rows);
  } catch (err) {
    console.log(err)
      res
        .status(500)
        .send(`Encountered an internal error when fetching wins`);
  }
};

const getPlayerTotalGames = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const player = await pgClient.query(
      `SELECT COUNT(id) FROM game WHERE player_one_id = $1 OR player_two_id = $1`,
      [id])

    res.status(200).send(player.rows);
  } catch (err) {
    console.log(err)
      res
        .status(500)
        .send(`Encountered an internal error when fetching wins`);
  }
};

export const playerDAO = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePassword,
  deletePlayer,
  getPlayerWins,
  getPlayerTotalGames
};
