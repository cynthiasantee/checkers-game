import { isOnBoard } from "./movePieceRules.js";
import { printBoard } from "./printBoard.js";

// const l = console.log;
// const jl = (obj) => console.log(JSON.stringify(obj));

export const getValidMoves = (curr,board) => {
  const [i, j] = curr;
  // printBoard(board);
  // jl(curr);
  const piece = board[i][j].piece;
  // jl(piece);
  const validMoves = [];

  const whiteFL = [i + 1, j - 1];
  const whiteTL = [i + 2, j - 2];
  const whiteFR = [i + 1, j + 1];
  const whiteTR = [i + 2, j + 2];
  const blackFL = [i - 1, j - 1];
  const blackTL = [i - 2, j - 2];
  const blackFR = [i - 1, j + 1];
  const blackTR = [i - 2, j + 2];

  if (piece.isDouble === false) {
    const pieceColor = piece.color;

    if (pieceColor === "white") {
      if (isOnBoard(whiteFL) && board[whiteFL[0]][whiteFL[1]].piece === null) {
        validMoves.push(whiteFL);
      } else if (
        isOnBoard(whiteTL) &&
        board[whiteTL[0]][whiteTL[1]].piece === null &&
        board[whiteFL[0]][whiteFL[1]].piece.color === "black"
      ) {
        validMoves.push(whiteTL);
      }

      if (isOnBoard(whiteFR) && board[whiteFR[0]][whiteFR[1]].piece === null) {
        validMoves.push(whiteFR);
      } else if (
        isOnBoard(whiteTR) &&
        board[whiteTR[0]][whiteTR[1]].piece === null &&
        board[whiteFR[0]][whiteFR[1]].piece.color === "black" &&
        isOnBoard(whiteTR)
      ) {
        validMoves.push(whiteTR);
      }
    } else if (pieceColor === "black") {
      if (isOnBoard(blackFL) && board[blackFL[0]][blackFL[1]].piece === null) {
        validMoves.push(blackFL);
      } else if (
        isOnBoard(blackTL) &&
        board[blackTL[0]][blackTL[1]].piece === null &&
        board[blackFL[0]][blackFL[1]].piece.color === "white"
      ) {
        validMoves.push(blackTL);
      }

      if (isOnBoard(blackFR) && board[blackFR[0]][blackFR[1]].piece === null) {
        validMoves.push(blackFR);
      } else if (
        isOnBoard(blackTR) &&
        board[blackTR[0]][blackTR[1]].piece === null &&
        board[blackFR[0]][blackFR[1]].piece.color === "white"
      ) {
        validMoves.push(blackTR);
      }
    }
  } else if (piece.isDouble === true) {
    if (board[whiteFL[0]][whiteFL[1]].piece === null) {
      validMoves.push(whiteFL);
    } else if (
      board[blackTL[0]][blackTL[1]].piece === null &&
      !board[blackFL[0]][blackFL[1]].piece.color
    ) {
      validMoves.push(blackTL);
    }

    if (board[whiteFR[0]][whiteFR[1]].piece === null) {
      validMoves.push(whiteFR);
    } else if (
      board[whiteTR[0]][whiteTR[1]].piece === null &&
      !board[whiteFR[0]][whiteFR[1]].piece.color
    ) {
      validMoves.push(whiteTR);
    }

    if (board[blackFL[0]][blackFL[1]].piece === null) {
      validMoves.push(blackFL);
    } else if (
      board[blackTL[0]][blackTL[1]].piece === null &&
      !board[blackFL[0]][blackFL[1]].piece.color
    ) {
      validMoves.push(blackTL);
    }

    if (board[blackFR[0]][blackFR[1]].piece === null) {
      validMoves.push(blackFR);
    } else if (
      board[blackTR[0]][blackTR[1]].piece === null &&
      !board[blackFR[0]][blackFR[1]].piece.color
    ) {
      validMoves.push(blackTR);
    }
  }

  return validMoves;
};
