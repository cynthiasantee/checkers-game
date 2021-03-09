import { logger } from '../config/index.js';
import { gameService } from "../service/gameService.js";
import express from 'express';


const router = express.Router();

//get all games
router.get('/all', async (_, res) => {
    logger.info('game/all');
    try {
        const allGames = await gameService.getGames();
        res.status(200).send(allGames.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get open games
router.get('/open', async (req, res) => {
    try {
        const openGames = await gameService.getOpenGames(req.query.myId);
        res.status(200).send(openGames.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get open games
router.get('/curr', async (req, res) => {
    try {
        const myCurrGames = await gameService.getMyCurrGames(req.query.myId);
        res.status(200).send(myCurrGames.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get empty games
router.get('/empty', async (req, res) => {
    try {
        const myEmptyGames = await gameService.getMyEmptyGames(req.query.myId);
        res.status(200).send(myEmptyGames.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get game by id
router.get('/id/:id', async (req, res) => {
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
router.put('/player/:id', async (req, res) => {
    try {
        await gameService.setSecondPlayer(req.body.player_two_id, req.params.id);
        res.status(200).send("SECOND_PLAYER_ADDED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//set winner
router.put('/winner/:id', async (req, res) => {
    try {
        await gameService.setWinner(req.params.id, req.body.winner_id);
        res.status(200).send("WINNER_UPDATED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;