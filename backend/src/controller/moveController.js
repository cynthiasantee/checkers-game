import { moveService } from "../service/moveService.js";
import express from 'express';

const router = express.Router();

router.use('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
});

//get game moves
router.get('/id/:id', async (req, res) => {
    try {
        const moves = await moveService.getMoves(req.params.id);
        res.status(200).send(moves).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//make move
router.post('/id/:id', async (req, res) => {
    try {
        const move = await moveService.makeMove(req.params.id, req.body.from_i, req.body.from_j, req.body.to_i, req.body.to_j);
        res.status(201).send(move).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//get curr board with existing moves
router.get('/curr/:id', async (req, res) => {
    try {
        const board = await moveService.getCurrBoard(req.params.id);
        res.status(201).send(board).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;