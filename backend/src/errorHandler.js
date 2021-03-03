export const Errors = {
    // Player
    NO_PLAYERS: 'NO_PLAYERS',
    PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',
    EMAIL_IN_USE: 'EMAIL_IN_USE',
    PLAYER_INSERT_FAILED: 'PLAYER_INSERT_FAILED',
    PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED',
    PLAYER_DELETION_FAILED: 'PLAYER_DELETION_FAILED',
    PLAYER_WINS_FAILED: 'PLAYER_WINS_FAILED',
    PLAYER_TOTAL_FAILED: 'PLAYER_TOTAL_FAILED',
    // Game
    NO_GAMES: 'NO_GAMES',
    GAME_NOT_FOUND: 'GAME_NOT_FOUND',
    GAME_INSERT_FAILED: 'GAME_INSERT_FAILED',
    SET_SECOND_PLAYER_FAILED: 'SET_SECOND_PLAYER_FAILED',
    SET_WINNER_FAILED: 'SET_WINNER_FAILED',
    // Move
    NO_MOVES: 'NO_MOVES',
    MOVE_INSERT_FAILED: 'MOVE_INSERT_FAILED',
    INVALID_MOVE: 'INVALID_MOVE',

    // 401 incorrect credentials
    INCORRECT_CREDENTIALS: 'INCORRECT_CREDENTIALS',

    // 403 forbidden
    FORBIDDEN: 'FORBIDDEN',

    // 404 not found
    MISSING_REQUIRED_DATA: 'MISSING_REQUIRED_DATA',
};

export const handle = (res) => (err) => {
    const errorObject = {
        400: [
            Errors.NO_PLAYERS,
            Errors.PLAYER_NOT_FOUND,
            Errors.EMAIL_IN_USE,
            Errors.PLAYER_INSERT_FAILED,
            Errors.PASSWORD_RESET_FAILED,
            Errors.PLAYER_DELETION_FAILED,
            Errors.PLAYER_WINS_FAILED,
            Errors.PLAYER_TOTAL_FAILED,
            Errors.NO_GAMES,
            Errors.GAME_NOT_FOUND,
            Errors.GAME_INSERT_FAILED,
            Errors.SET_SECOND_PLAYER_FAILED,
            Errors.SET_WINNER_FAILED,
            Errors.NO_MOVES,
            Errors.MOVE_INSERT_FAILED,
            Errors.INVALID_MOVE,

        ],
        401: [Errors.INCORRECT_CREDENTIALS],
        403: [Errors.FORBIDDEN],
        404: [Errors.MISSING_REQUIRED_DATA],
    };

    if (errorObject[400].includes(err)) {
        return res.status(400).send(err);
    } else if (errorObject[401].includes(err)) {
        return res.status(401).send(err);
    } else if (errorObject[403].includes(err)) {
        return res.status(403).send(err);
    } else if (errorObject[404].includes(err)) {
        return res.status(404).send(err);
    } else {
        console.log(err);
        res.status(500).send('');
    }
};
