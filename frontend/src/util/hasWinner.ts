import { BoardSquare } from "../redux/api/addMoveApi";
import { BOARD_SIZE } from "./boardSize";

export const hasWinner = (board: BoardSquare[][]) => {
  let blacks = 0;
  let whites = 0;

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].piece && board[i][j].piece?.color === "white") {
        whites++;
      }

      if (board[i][j].piece && board[i][j].piece?.color === "black") {
        blacks++;
      }
    }
  }

  if (blacks === 0) {
    return "white";
  } else if (whites === 0) {
    return "black";
  } else {
    return "NO_WINNER";
  }
};
