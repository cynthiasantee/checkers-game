import { combineReducers } from "@reduxjs/toolkit";
import page from "./reducer/page";
import selectPiece from "./reducer/selectPiece";
import player from "./reducer/getPlayerReducer";
import playerWins from "./reducer/getPlayerWinsReducer";
import playerTotalGames from "./reducer/getPlayerTotalGamesReducer";
import createGame from "./reducer/createGameReducer";
import addMove from "./reducer/addMoveReducer";
import getGame from "./reducer/getGameReducer";
import getGames from "./reducer/getGamesReducer";
import currBoard from "./reducer/getCurrBoardReducer";
import addSecondPlayer from "./reducer/addSecondPlayerReducer";
import changeTurn from "./reducer/changeTurnReducer";
import myId from "./reducer/myId";
import setColors from "./reducer/setColorsReducer";
import login from "./reducer/loginReducer";
import register from "./reducer/registerReducer";
import setWinner from "./reducer/setWinnerReducer";

export default combineReducers({
  page,
  player,
  playerWins,
  playerTotalGames,
  createGame,
  addMove,
  selectPiece,
  getGame,
  getGames,
  currBoard,
  addSecondPlayer,
  changeTurn,
  myId,
  setColors,
  login,
  register,
  setWinner,
});
