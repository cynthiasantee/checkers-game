import { playerService } from "../service/playerService.js";
import express from 'express';
// import { Errors } from '../errorHandler.js';

const router = express.Router();

//get all players
router.get('/all', async (_, res) => {
    try {
        const allPlayers = await playerService.getPlayers();
        res.status(200).send(allPlayers.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player wins **
router.get('/wins/:id', async (req, res) => {
    try {
        const wins = await playerService.getPlayerWins(req.body.id);
        res.status(200).send(wins.rows[0].count).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player total **
router.get('/total/:id', async (req, res) => {
    try {
        const total = await playerService.getPlayerTotalGames(req.body.id);
        res.status(200).send(total.rows[0].count).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player by id **
router.get('/id/:id', async (req, res) => {
    try {
        const player = await playerService.getPlayer(req.params.id);
        res.status(200).send(player.rows[0]).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//create player
router.post('/', async (req, res) => {
    try {
        const player = await playerService.createPlayer(req.body.email, req.body.username, req.body.password);
        res.status(201).send(player.rows[0]).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//update password **
router.put('/id/:id', async (req, res) => {
    try {
        await playerService.updatePassword(req.params.id, req.body.email, req.body.password);
        res.status(200).send("PASSWORD_UPDATED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;