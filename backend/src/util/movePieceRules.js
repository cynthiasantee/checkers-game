import { removePiece } from "./removePiece.js";
import { BOARD_SIZE } from "./boardSize.js";


export const isOnBoard = ([i, j]) => {
  const iIsOnBoard = i >= 0 && i < BOARD_SIZE;
  const jIsOnBoard = j >= 0 && j < BOARD_SIZE;
  return iIsOnBoard && jIsOnBoard;
};

export const isEmpty = ([i, j], board) => {
  return !board[i][j].piece;
};

export const isDiagonalByOneOrTwo = ([currI, currJ], [destI, destJ], board) => {
  const piece = board[currI][currJ].piece;
  const blackMovesByOne = [[currI - 1, currJ - 1],[currI - 1, currJ + 1]];
  const blackMovesByTwo = [[currI - 2, currJ - 2],[currI - 2, currJ + 2]];
  const whiteMovesByOne = [[currI + 1, currJ - 1],[currI + 1, currJ + 1]];
  const whiteMovesByTwo = [[currI + 2, currJ - 2],[currI + 2, currJ + 2]];

  const doubleDiagonalByOne = [...blackMovesByOne, ...whiteMovesByOne];
  const doubleDiagonalByTwo = [...blackMovesByTwo, ...whiteMovesByTwo];

  if (piece && !piece.isDouble) {
    if (piece.color === "white" && whiteMovesByOne.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byOne";
    } else if (piece.color === "white" && whiteMovesByTwo.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byTwo";
    } else if (piece.color === "black" && blackMovesByOne.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byOne";
    } else if (piece.color === "black" && blackMovesByTwo.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byTwo";
    } else {
      return "invalidMove";
    }
  } else if (piece && piece.isDouble) {
    if (doubleDiagonalByOne.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byOne";
    } else if (doubleDiagonalByTwo.some((arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ]))) {
      return "byTwo";
    } else {
      return "invalidMove";
    }
  } else {
    return "invalidMove"
  }
};