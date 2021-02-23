import {pgClient} from "../pool.js";

const getGames = async (_, res) => {
    try {
      const games = await pgClient.query('SELECT * FROM game');
      res.status(200).send(games.rows);
    } catch (err) {
      console.log(err)
        res
          .status(500)
          .send(`Encountered an internal error when fetching games`);
    }
  };
  
  const getGameById = async (req, res) => {
    const id = parseInt(req.params.id)
  
    try {
      const game = await pgClient.query(
        `SELECT * FROM game WHERE id = $1`,
        [id])
  
      res.status(200).send(game.rows);
    } catch (err) {
      console.log(err)
        res
          .status(500)
          .send(`Encountered an internal error when fetching game`);
    }
  };
  
  const createGame = async (req, res) => {
    const { player_one_id } = req.body;
      try {
        const game = await pgClient.query(
          `INSERT INTO game (player_one_id) VALUES ($1) RETURNING id as new_game_id`,
          [player_one_id])
    
          res.status(201).send(game.rows[0]);
      } catch (err) {
        console.log(err);
        res
        .status(500)
        .send('Encountered an internal error when creating game');
      }
  };
  
  const setSecondPlayer = async (req, res) => {
    const id = parseInt(req.params.id);
    const { player_two_id } = req.body;
  
    try {
      await pgClient.query(
        "UPDATE game SET player_two_id = $1 WHERE id = $2",
        [player_two_id, id])
        res.status(200).send(`Game updated`);
    } catch (err) {
      console.log(err)
      res
      .status(500)
      .send('Encountered an internal error when updating game');
    }
  };

  const setWinner = async (req, res) => {
    const id = parseInt(req.params.id);
    const { winner_id } = req.body;
  
    try {
      await pgClient.query(
        "UPDATE game SET winner_id = $1 WHERE id = $2",
        [winner_id, id])
        res.status(200).send(`Game updated`);
    } catch (err) {
      console.log(err)
      res
      .status(500)
      .send('Encountered an internal error when updating game');
    }
  };
  
  export const gameDAO = {
    getGames,
    getGameById,
    createGame,
    setSecondPlayer,
    setWinner,
  };