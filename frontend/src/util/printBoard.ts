import { BoardSquare } from "../redux/reducer/board";

export const printBoard = (board: BoardSquare[][]) => {
  return console.log(
    board
      .map((row) => {
        return row
          .map((square) => {
            if (square.piece === null) {
              return "O";
            } else if (square.piece.color === "black") {
              return "B";
            } else if (square.piece.color === "white") {
              return "W";
            }
          })
          .join("");
      })
      .join("\n")
  );
};
