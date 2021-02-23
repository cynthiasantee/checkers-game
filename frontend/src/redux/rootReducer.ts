import { combineReducers } from "@reduxjs/toolkit";
import page from "./reducer/page";
import player from "./reducer/getPlayerReducer";
import playerWins from "./reducer/getPlayerWinsReducer";
import playerTotalGames from "./reducer/getPlayerTotalGamesReducer";
import createGame from "./reducer/createGameReducer";

export default combineReducers({
  page,
  player,
  playerWins,
  playerTotalGames,
  createGame,
});
