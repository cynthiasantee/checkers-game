import { gameDao } from "../dao/gameDao.js";
import { Errors } from '../errorHandler.js';
import { game } from "../index.js"

const getGames = async () => {
    const games = await gameDao.getGames();
    if (!games.rows ) throw Errors.NO_GAMES;
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

    game.to(`game${id}`).emit("second_player");
};

const setWinner = async (id, winner_id) => {
    const setWinnerUpdate = await gameDao.setWinner(id, winner_id);

    if (setWinnerUpdate.rowCount === 0) {
        throw Errors.SET_WINNER_FAILED;
    };
};

const setTurn = async (other_player_id, game_id) => {
    const setTurn = await gameDao.setTurn(other_player_id, game_id);

    if (setTurn.rowCount === 0) {
        throw Errors.SET_TURN_FAILED;
    };

    game.to(`game${game_id}`).emit("game_changed");

    return setTurn;
};

const setColors = async (player_one_id, player_id, color, game_id) => {
    const setColors = await gameDao.setColors(player_one_id, player_id, color, game_id);

    if (setTurn.rowCount === 0) {
        throw Errors.SET_COLORS_FAILED;
    };

    game.to(`game${game_id}`).emit("color_set");
};

export const gameService = {
    getGames,
    getGameById,
    createGame,
    setSecondPlayer,
    setWinner,
    setTurn,
    setColors
};