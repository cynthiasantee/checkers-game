import { moveDao } from "../dao/moveDao.js";
import { Errors } from '../errorHandler.js';
import { deepCopyBoard } from "../util/deepCopyBoard.js";
import { INITIAL_BOARD } from "../util/initialBoard.js";
import {movePiece} from "../util/move.js"
import { printBoard } from "../util/printBoard.js";

const getMoves = async (id) => {
    const moves = await moveDao.getMoves(id);
    if (!moves.rows) throw Errors.NO_MOVES;
    return moves;
};

const makeMove = async (id,from_i, from_j, to_i, to_j) => {
    let board = deepCopyBoard(INITIAL_BOARD);
    const existingMoves = await moveDao.getMoves(id);
    if (!existingMoves.rows) throw Errors.NO_MOVES;

    printBoard(board);

    existingMoves.rows.forEach(move => {
        movePiece([move.from_i, move.from_j], [move.to_i, move.to_j], board);
    })

    printBoard(board);

    if (movePiece([from_i, from_j], [to_i, to_j], board) !== "move not made") {
        const moveInsert = await moveDao.makeMove(id,from_i, from_j, to_i, to_j);
        return moveInsert;
    } else {
        // We need this if since errors return undefined.
        throw Errors.MOVE_INSERT_FAILED;
    }
    
};

export const moveService = {
    getMoves,
    makeMove
};