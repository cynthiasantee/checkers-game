import { combineReducers } from "@reduxjs/toolkit";
import page from "./reducer/page";
import selectPiece from "./reducer/selectPiece";
import player from "./reducer/getPlayerReducer";
import playerWins from "./reducer/getPlayerWinsReducer";
import playerTotalGames from "./reducer/getPlayerTotalGamesReducer";
import createGame from "./reducer/createGameReducer";
import addMove from "./reducer/addMoveReducer";
import getGame from "./reducer/getGameReducer";
import currBoard from "./reducer/getCurrBoardReducer";
import openGames from "./reducer/getOpenGamesReducer";
import addSecondPlayer from "./reducer/addSecondPlayerReducer";
import myCurrGames from "./reducer/getMyCurrGamesReducer";
import myEmptyGames from "./reducer/getEmptyGamesReducer";

export default combineReducers({
  page,
  player,
  playerWins,
  playerTotalGames,
  createGame,
  addMove,
  selectPiece,
  getGame,
  currBoard,
  openGames,
  addSecondPlayer,
  myCurrGames,
  myEmptyGames,
});
