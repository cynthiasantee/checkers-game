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
        const wins = await playerService.getPlayerWins(req.body.id);
        res.status(200).send(wins.rows[0].count).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get player total
router.get('/total/:id', async (req, res) => {
    try {
        const total = await playerService.getPlayerTotalGames(req.body.id);
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

//update password
router.put('/id/:id', async (req, res) => {
    try {
        await playerService.updatePassword(req.params.id, req.body.email, req.body.password);
        res.status(200).send("PASSWORD_UPDATED").end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;