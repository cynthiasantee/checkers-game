import { gameDao } from "../dao/gameDao.js";
import { Errors } from '../errorHandler.js';

const getGames = async () => {
    const games = await gameDao.getGames();
    if (!games.rows || !games.rows.length) throw Errors.NO_GAMES;
    return games;
};

const getGameById = async (id) => {
    const game = await gameDao.getGameById(id);
    if (!game.rows || !game.rows.length) throw Errors.GAME_NOT_FOUND;
    return game;
};

const createGame = async (player_one_id) => {
    const gameInsert = await gameDao.createGame(player_one_id);

    // We need this if since errors return undefined.
    if (!gameInsert) throw Errors.GAME_INSERT_FAILED;

    return gameInsert;
};

const setSecondPlayer = async (player_two_id, id) => {
    const secondPlayerUpdate = await gameDao.setSecondPlayer(player_two_id, id);

    if (secondPlayerUpdate.rowCount === 0) {
        throw Errors.SET_SECOND_PLAYER_FAILED;
    };
};

const setWinner = async (id, winner_id) => {
    const setWinnerUpdate = await gameDao.setWinner(id, winner_id);

    if (setWinnerUpdate.rowCount === 0) {
        throw Errors.SET_WINNER_FAILED;
    };
};

export const gameService = {
    getGames,
    getGameById,
    createGame,
    setSecondPlayer,
    setWinner
};