import { combineReducers } from "@reduxjs/toolkit";
import board from "./reducer/board";
import page from "./reducer/page";
import player from "./reducer/getPlayerReducer";
import playerWins from "./reducer/getPlayerWinsReducer";
import playerTotalGames from "./reducer/getPlayerTotalGamesReducer";
import createGame from "./reducer/createGameReducer";
import addMove from "./reducer/addMoveReducer";

export default combineReducers({
  page,
  player,
  playerWins,
  playerTotalGames,
  createGame,
  board,
  addMove,
});
