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

const getOpenGames = async (myId) => {
    const openGames = await gameDao.getOpenGames(myId);
    if (!openGames.rows ) throw Errors.OPEN_GAMES_NOT_FOUND;
    return openGames;
};

const getMyCurrGames = async (myId) => {
    const currGames = await gameDao.getMyCurrGames(myId);
    if (!currGames.rows ) throw Errors.MY_CURR_GAMES_NOT_FOUND;
    return currGames;
};

const getMyEmptyGames = async (myId) => {
    const emptyGames = await gameDao.getMyEmptyGames(myId);
    if (!emptyGames.rows ) throw Errors.MY_EMPTY_GAMES_NOT_FOUND;
    return emptyGames;
};

export const gameService = {
    getGames,
    getGameById,
    createGame,
    setSecondPlayer,
    setWinner,
    getOpenGames,
    getMyCurrGames,
    getMyEmptyGames
};