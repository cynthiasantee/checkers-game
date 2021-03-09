import { isOnBoard } from "./movePieceRules.js";
import { printBoard } from "./printBoard.js";

export const getValidMoves = (curr, board) => {
  const [i, j] = curr;
  const piece = board[i][j].piece;
  const validMoves = [];

  const whiteFL = [i + 1, j - 1];
  const whiteTL = [i + 2, j - 2];
  const whiteFR = [i + 1, j + 1];
  const whiteTR = [i + 2, j + 2];
  const blackFL = [i - 1, j - 1];
  const blackTL = [i - 2, j - 2];
  const blackFR = [i - 1, j + 1];
  const blackTR = [i - 2, j + 2];

  if (piece && piece.isDouble === false) {
    const pieceColor = piece.color;

    if (pieceColor === "white") {
      if (isOnBoard(whiteFL) && board[whiteFL[0]][whiteFL[1]].piece === null) {
        validMoves.push(whiteFL);
      } 
      
      if (isOnBoard(whiteTL) && board[whiteTL[0]][whiteTL[1]].piece === null && board[whiteFL[0]][whiteFL[1]].piece && board[whiteFL[0]][whiteFL[1]].piece.color === "black") {
        validMoves.push(whiteTL);
      }

      if (isOnBoard(whiteFR) && board[whiteFR[0]][whiteFR[1]].piece === null) {
        validMoves.push(whiteFR);
      }
      
      if (isOnBoard(whiteTR) && board[whiteTR[0]][whiteTR[1]].piece === null && board[whiteFR[0]][whiteFR[1]].piece && board[whiteFR[0]][whiteFR[1]].piece.color === "black") {
        validMoves.push(whiteTR);
      }
    } else if (pieceColor === "black") {
      if (isOnBoard(blackFL) && board[blackFL[0]][blackFL[1]].piece === null) {
        validMoves.push(blackFL);
      } 
      
      if (isOnBoard(blackTL) && board[blackTL[0]][blackTL[1]].piece === null && board[blackFL[0]][blackFL[1]].piece && board[blackFL[0]][blackFL[1]].piece.color === "white") {
        validMoves.push(blackTL);
      }

      if (isOnBoard(blackFR) && board[blackFR[0]][blackFR[1]].piece === null) {
        validMoves.push(blackFR);
      } 
      
      if (isOnBoard(blackTR) && board[blackTR[0]][blackTR[1]].piece === null && board[blackFR[0]][blackFR[1]].piece && board[blackFR[0]][blackFR[1]].piece.color === "white") {
        validMoves.push(blackTR);
      }
    }
  } else if (piece && piece.isDouble === true) {
    const pieceColor = piece.color;

    if (pieceColor === "white") {
      if (isOnBoard(blackFR) && board[blackFR[0]][blackFR[1]].piece === null) {
         validMoves.push(blackFR);
      }

      if (isOnBoard(blackTR) && board[blackTR[0]][blackTR[1]].piece === null && board[blackFR[0]][blackFR[1]].piece && board[blackFR[0]][blackFR[1]].piece.color === "black") {
        validMoves.push(blackTR);
      }

      if (isOnBoard(blackFL) && board[blackFL[0]][blackFL[1]].piece === null) {
        validMoves.push(blackFL);
      }

      if (isOnBoard(blackTL) && board[blackTL[0]][blackTL[1]].piece === null && board[blackFL[0]][blackFL[1]].piece && board[blackFL[0]][blackFL[1]].piece.color === "black") {
        validMoves.push(blackTL);
      }

      if (isOnBoard(whiteFR) && board[whiteFR[0]][whiteFR[1]].piece === null) {
        validMoves.push(whiteFR);
      }

      if (isOnBoard(whiteTR) && board[whiteTR[0]][whiteTR[1]].piece === null && board[whiteFR[0]][whiteFR[1]].piece && board[whiteFR[0]][whiteFR[1]].piece.color === "black") {
        validMoves.push(whiteTR);
      }

      if (isOnBoard(whiteFL) && board[whiteFL[0]][whiteFL[1]].piece === null) {
        validMoves.push(whiteFL);
      }

      if (isOnBoard(whiteTL) && board[whiteTL[0]][whiteTL[1]].piece === null && board[whiteFL[0]][whiteFL[1]].piece && board[whiteFL[0]][whiteFL[1]].piece.color === "black") {
        validMoves.push(whiteTL);
      }
    } else {
      if (isOnBoard(blackFR) && board[blackFR[0]][blackFR[1]].piece === null) {
         validMoves.push(blackFR);
      }

      if (isOnBoard(blackTR) && board[blackTR[0]][blackTR[1]].piece === null && board[blackFR[0]][blackFR[1]].piece && board[blackFR[0]][blackFR[1]].piece.color === "white") {
        validMoves.push(blackTR);
      }

      if (isOnBoard(blackFL) && board[blackFL[0]][blackFL[1]].piece === null) {
        validMoves.push(blackFL);
      }

      if (isOnBoard(blackTL) && board[blackTL[0]][blackTL[1]].piece === null && board[blackFL[0]][blackFL[1]].piece && board[blackFL[0]][blackFL[1]].piece.color === "white") {
        validMoves.push(blackTL);
      }

      if (isOnBoard(whiteFR) && board[whiteFR[0]][whiteFR[1]].piece === null) {
        validMoves.push(whiteFR);
      }

      if (isOnBoard(whiteTR) && board[whiteTR[0]][whiteTR[1]].piece === null && board[whiteFR[0]][whiteFR[1]].piece && board[whiteFR[0]][whiteFR[1]].piece.color === "white") {
        validMoves.push(whiteTR);
      }

      if (isOnBoard(whiteFL) && board[whiteFL[0]][whiteFL[1]].piece === null) {
        validMoves.push(whiteFL);
      }

      if (isOnBoard(whiteTL) && board[whiteTL[0]][whiteTL[1]].piece === null && board[whiteFL[0]][whiteFL[1]].piece && board[whiteFL[0]][whiteFL[1]].piece.color === "white") {
        validMoves.push(whiteTL);
      }
    }
  }

  return validMoves;
};