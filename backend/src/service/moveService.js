import { moveDao } from "../dao/moveDao.js";
import { Errors } from '../errorHandler.js';
import { INITIAL_BOARD } from "../util/initialBoard.js";
import {movePiece} from "../util/move.js"
import _ from "lodash";

const getMoves = async (id) => {
    const moves = await moveDao.getMoves(id);
    if (!moves.rows) throw Errors.NO_MOVES;
    return moves.rows;
};

const makeMove = async (id,from_i, from_j, to_i, to_j) => {
    let board = _.cloneDeep(INITIAL_BOARD);
    const existingMoves = await moveDao.getMoves(id);
    if (!existingMoves.rows) throw Errors.NO_MOVES;

    existingMoves.rows.forEach(move => {
        movePiece([move.from_i, move.from_j], [move.to_i, move.to_j], board);
    })

    const newMove = movePiece([from_i, from_j], [to_i, to_j], board)

    if (newMove !== "move not made") {
        const moveInsert = await moveDao.makeMove(id,from_i, from_j, to_i, to_j);
        if (moveInsert.rowCount !== 1) throw Errors.MOVE_INSERT_FAILED;

        return "MOVE_MADE";

    } else {
        // We need this if since errors return undefined.
        throw Errors.INVALID_MOVE;
    }
    
};

const getCurrBoard = async (id) => {
    let board = _.cloneDeep(INITIAL_BOARD);
    const existingMoves = await moveDao.getMoves(id);
    if (!existingMoves.rows) throw Errors.NO_MOVES;

    existingMoves.rows.forEach(move => {
        movePiece([move.from_i, move.from_j], [move.to_i, move.to_j], board);
    })

    return board;
}

export const moveService = {
    getMoves,
    makeMove,
    getCurrBoard
};