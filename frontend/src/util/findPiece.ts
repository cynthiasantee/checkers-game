import { BoardSquare } from "../redux/reducer/board";
import { Location } from "./move";

export const findPiece = (pieceID: number, board: BoardSquare[][]) => {
  let location: Location = [-1, -1];
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square.piece && square.piece.id === pieceID) {
        location = [i, j];
      }
    });
  });
  return location;
};
