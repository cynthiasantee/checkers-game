import { removePiece } from "./removePiece";
import { BoardSquare } from "../redux/api/addMoveApi";
import { BOARD_SIZE } from "./boardSize";
import { Location } from "./move";

type TypeOfMove = "byOne" | "byTwo" | "invalidMove";

export const isOnBoard = ([i, j]: Location): boolean => {
  const iIsOnBoard = i >= 0 && i < BOARD_SIZE;
  const jIsOnBoard = j >= 0 && j < BOARD_SIZE;
  return iIsOnBoard && jIsOnBoard;
};

export const isEmpty = ([i, j]: Location, board: BoardSquare[][]): boolean => {
  return !board[i][j].piece;
};

export const isDiagonalByOneOrTwo = (
  [currI, currJ]: Location,
  [destI, destJ]: Location,
  board: BoardSquare[][]
): TypeOfMove => {
  const piece = board[currI][currJ].piece;
  const blackMovesByOne = [
    [currI - 1, currJ - 1],
    [currI - 1, currJ + 1],
  ];
  const blackMovesByTwo = [
    [currI - 2, currJ - 2],
    [currI - 2, currJ + 2],
  ];
  const whiteMovesByOne = [
    [currI + 1, currJ - 1],
    [currI + 1, currJ + 1],
  ];
  const whiteMovesByTwo = [
    [currI + 2, currJ - 2],
    [currI + 2, currJ + 2],
  ];

  if (
    piece &&
    piece.color === "white" &&
    whiteMovesByOne.some(
      (arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ])
    )
  ) {
    return "byOne";
  } else if (
    piece &&
    piece.color === "white" &&
    whiteMovesByTwo.some(
      (arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ])
    )
  ) {
    return "byTwo";
  } else if (
    piece &&
    piece.color === "black" &&
    blackMovesByOne.some(
      (arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ])
    )
  ) {
    return "byOne";
  } else if (
    piece &&
    piece.color === "black" &&
    blackMovesByTwo.some(
      (arr) => JSON.stringify(arr) === JSON.stringify([destI, destJ])
    )
  ) {
    return "byTwo";
  } else {
    return "invalidMove";
  }
};

//console.log(isDiagonalByOneOrTwo([1,2], [3, 0], initialBoard));

// const movePieceRules = (curr: Location, to: Location, board: BoardSquare[][]) => {
//     if (isOnBoard(to) && isEmpty(to, board) {
//
//
//          toDouble(movePiece(curr, to, board))
//     }
// }

//findPiece(PIECEID, board) Location
//getValidMoves(curr, board) Location[]

//toDouble(board) undefined

//removePiece(piece, board) undefined
//isOnBoard(to) boolean
//isEmpty(to, board) boolean
//isDiagonalByOneOrTwo(curr, to, board) byOne, byTwo, invalidMove
//movePiece(curr, to, board) undefined (moves && removes)
