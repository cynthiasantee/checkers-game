import { moveDao } from "../dao/moveDao.js";
import { Errors } from '../errorHandler.js';


const getMoves = async (id) => {
    const moves = await moveDao.getMoves(id);
    if (!moves.rows) throw Errors.NO_MOVES;
    return moves;
};

const makeMove = async (id,from_x, from_y, to_x, to_y) => {
    // const isValidEmail = await playerDao.emailCheck(email);
    // if (isValidEmail.rows && isValidEmail.rows.length > 0) throw Errors.EMAIL_IN_USE;

    const moveInsert = await moveDao.makeMove(id,from_x, from_y, to_x, to_y);

    // We need this if since errors return undefined.
    if (!moveInsert) throw Errors.MOVE_INSERT_FAILED;
    
    return moveInsert;
};

export const moveService = {
    getMoves,
    makeMove
};