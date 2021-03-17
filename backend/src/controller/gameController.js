import { logger } from '../config/index.js';
import { gameService } from "../service/gameService.js";
import express from 'express';


const router = express.Router();

router.use('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
});

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

//set turn
router.put('/turn/:game_id', async (req, res) => {
    try {
        const newTurn = await gameService.setTurn(req.body.other_player_id, req.params.game_id);
        res.status(200).send(newTurn.rows[0]).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//set colors
router.put('/colors/:game_id', async (req, res) => {
    try {
        const setColors = await gameService.setColors(req.body.player_one_id, req.body.player_id, req.body.color, req.params.game_id);
        res.status(200).send("COLORS_ADDED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;