import { playerDao } from "../dao/playerDao.js";
import { Errors } from '../errorHandler.js';

const getPlayers = async () => {
    const players = await playerDao.getPlayers();
    if (!players.rows || !players.rows.length) throw Errors.NO_PLAYERS;
    return players;
};
   
//by id
const getPlayer = async (id) => {
    const player = await playerDao.getPlayer(id);
    if (!player.rows || !player.rows.length) throw Errors.PLAYER_NOT_FOUND;
    return player;
};

//by email
const getPlayerByEmail = async (email) => {
    const player = await playerDao.getPlayerByEmail(email);
    if (!player.rows || !player.rows.length) throw Errors.ACCOUNT_NOT_FOUND;
    return player.rows[0];
};

const createPlayer = async (email, username, password) => {
    const isValidEmail = await playerDao.emailCheck(email);
    if (isValidEmail.rows && isValidEmail.rows.length > 0) throw Errors.EMAIL_IN_USE;

    const isValidUsername = await playerDao.usernameCheck(username);
    if (isValidUsername.rows && isValidUsername.rows.length > 0) throw Errors.USERNAME_IN_USE;

    const playerInsert = await playerDao.createPlayer(email, username, password);

    // We need this if since errors return undefined.
    if (!playerInsert) throw Errors.PLAYER_INSERT_FAILED;
    
    return playerInsert;
};

const updatePassword = async (id, email, password) => {
    const passwordUpdate = await playerDao.updatePassword(id, email, password);

    if (passwordUpdate.rowCount === 0) {
        throw Errors.PASSWORD_RESET_FAILED;
    };
};

const getPlayerWins = async (id) => {
    const wins = await playerDao.getPlayerWins(id);
    if (!wins.rows|| !wins.rows.length) throw Errors.PLAYER_WINS_FAILED;
    return wins;
};

const getPlayerTotalGames = async (id) => {
    const total = await playerDao.getPlayerTotalGames(id);
    if (!total.rows|| !total.rows.length) throw Errors.PLAYER_TOTAL_FAILED;
    return total;
};

export const playerService = {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePassword,
    getPlayerWins,
    getPlayerTotalGames,
    getPlayerByEmail,
};