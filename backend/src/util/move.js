import { isDiagonalByOneOrTwo } from "./movePieceRules.js";
import { removePiece } from "./removePiece.js";
import { compArr } from "./compArr.js";
import { getValidMoves } from "./getValidMoves.js";
import { toDouble } from "./toDouble.js";

export const movePiece = ([currI, currJ],[destI, destJ],board) => {
  const currentLocation = board[currI][currJ];
  const moveTo = board[destI][destJ];
  const destPieces = [
    [currI - 2, currJ - 2],
    [currI - 2, currJ + 2],
    [currI + 2, currJ - 2],
    [currI + 2, currJ + 2],
  ];
  const pieceToRemove = [
    [currI - 1, currJ - 1],
    [currI - 1, currJ + 1],
    [currI + 1, currJ - 1],
    [currI + 1, currJ + 1],
  ];

  const move = () => {
    moveTo.piece = currentLocation.piece;
    currentLocation.piece = null;
  };

  if (
    getValidMoves([currI, currJ], board).some(
      (location) => JSON.stringify(location) === JSON.stringify([destI, destJ])
    )
  ) {
    if (
      isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === "byTwo"
    ) {
      destPieces.forEach((piece, i) => {
        if (compArr([destI, destJ], [piece[0], piece[1]])) {
          move();
          removePiece(pieceToRemove[i], board);
          toDouble(board);
        }
      });
    } else if (
      isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === "byOne"
    ) {
      move();
      toDouble(board);
    }
  } else {
    return "move not made";
  }
};
