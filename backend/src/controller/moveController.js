import { moveService } from "../service/moveService.js";
import express from 'express';

const router = express.Router();

// app.get("/move/:id", moveDao.getMoves);
// app.post("/move/:id", moveDao.makeMove);

//get game moves
router.get('/:id', async (req, res) => {
    try {
        const moves = await moveService.getMoves(req.params.id);
        res.status(200).send(moves.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

//make move
router.post('/:id', async (req, res) => {
    try {
        const move = await moveService.makeMove(req.params.id, req.body.from_i, req.body.from_j, req.body.to_i, req.body.to_j);
        res.status(201).send(move.rows).end();
    } catch(err) {
        return res.errorHandler(err);
    }
});

export default router;