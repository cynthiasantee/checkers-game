import {pgClient} from "../index.js";

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
//   const id = parseInt(req.params.id);

//   const player = await pgClient.query('SELECT * FROM player WHERE id = $1', [id])
//   .catch(e => {
//     res
//       .status(500)
//       .send(`Encountered an internal error when fetching item with ID ${id}`);
//   });
// res.status(200).send(player.rows)
};

const createPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;

    await pgClient.query(
      `INSERT INTO player (email, password) VALUES ($1, $2)`,
      [email, password])

      res.status(201).send(`Player created`);
  } catch (err) {
    console.log(`this is my error:`, err);
    res
    .status(500)
    .send('Encountered an internal error when creating an item');
  }
};

const updatePassword = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { email, password } = req.body;

//   await pgClient.query(
//     "UPDATE player SET email = $1, password = $2 WHERE id = $3",
//     [email, password, id])
//     .catch(e => {
//       res
//         .status(500)
//         .send('Encountered an internal error when updating an item');
//     });
// res.status(200).send(`Player updated with ID: ${id}`);
};

const deletePlayer = async (req, res) => {
  // const id = parseInt(req.params.id);

  // await pgClient.query("DELETE FROM player WHERE id = $1", [id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   res.status(200).send(`Player deleted with ID: ${id}`);
  // });
};

export const playerDAO = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePassword,
  deletePlayer,
};
