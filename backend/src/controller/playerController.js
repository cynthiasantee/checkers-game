import { playerService } from "../service/playerService.js";
import express from 'express';

const router = express.Router();

router.use('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
});

//get all players
router.get('/all', async (_, res) => {
    try {
        const allPlayers = await playerService.getPlayers();
        res.status(200).send(allPlayers.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player wins
router.get('/wins/:id', async (req, res) => {
    try {
        const wins = await playerService.getPlayerWins(req.params.id);
        res.status(200).send(wins.rows[0].count).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player total
router.get('/total/:id', async (req, res) => {
    try {
        const total = await playerService.getPlayerLosses(req.params.id);
        res.status(200).send(total.rows[0].count).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player by id
router.get('/id/:id', async (req, res) => {
    try {
        const player = await playerService.getPlayer(req.params.id);
        res.status(200).send(player).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player by id (player info for heartbeat request)
router.get('/info', async (req, res) => {
    try {
        const player = await playerService.getPlayer(req.user.id);
        const playerInfo = await playerService.getPlayerInfo(player.player_id)
        res.status(200).send(playerInfo).end();
    } catch(err) {
        return res.errorHandler(err);
    }

});

//get player by email
router.get('/email/:email', async (req, res) => {
    try {
        const player = await playerService.getPlayerByEmail(req.params.email);
        res.status(200).send(player).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;