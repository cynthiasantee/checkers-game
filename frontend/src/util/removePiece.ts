import { BoardSquare } from "../redux/api/addMoveApi";
import { Location } from "./move";

export const removePiece = (piece: Location, board: BoardSquare[][]) => {
  const toRemove = board[piece[0]][piece[1]];
  toRemove.piece = null;
};
