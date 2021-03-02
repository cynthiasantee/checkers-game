import { gameService } from "../service/gameService.js";
import express from 'express';

const router = express.Router();

//get all games
router.get('/all', async (_, res) => {
    try {
        const allGames = await gameService.getGames();
        res.status(200).send(allGames.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get game by id
router.get('/:id', async (req, res) => {
    try {
        const game = await gameService.getGameById(req.params.id);
        res.status(200).send(game.rows[0]).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//create game
router.post('/', async (req, res) => {
    try {
        const game = await gameService.createGame(req.body.player_one_id);
        res.status(201).send(game.rows[0]).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//set second player
router.put('/:id/player', async (req, res) => {
    try {
        await gameService.setSecondPlayer(req.params.id, req.body.player_two_id);
        res.status(200).send("SECOND_PLAYER_UPDATED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//set winner
router.put('/:id/winner', async (req, res) => {
    try {
        await gameService.setWinner(req.params.id, req.body.winner_id);
        res.status(200).send("WINNER_UPDATED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;