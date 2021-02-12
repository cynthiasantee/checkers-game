import {pool} from "./pool.js";

const getPlayers = (request, response) => {
  pool.query("SELECT * FROM player", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPlayerById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM player WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPlayer = (request, response) => {
  const { email, password } = request.body;

  pool.query(
    "INSERT INTO player (name, email) VALUES (DEFAULT, $1, $2)",
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Player added with ID: ${response.insertId}`);
    }
  );
};

const updatePassword = (request, response) => {
  const id = parseInt(request.params.id);
  const { email, password } = request.body;

  pool.query(
    "UPDATE player SET name = $1, email = $2 WHERE id = $3",
    [email, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Player modified with ID: ${id}`);
    }
  );
};

const deletePlayer = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM player WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Player deleted with ID: ${id}`);
  });
};

export const playerDAO = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePassword,
  deletePlayer,
};
