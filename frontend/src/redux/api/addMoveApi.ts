import { api } from "../../axios.config";
import { Location } from "../../util/move";

export type Color = "white" | "black";

export interface Piece {
  id: number;
  color: Color | string;
  isDouble: boolean;
}

export interface BoardSquare {
  squareColor: Color | string;
  piece: Piece | null;
  location: Location;
}

export interface Move {
  from_i: number;
  from_j: number;
  to_i: number;
  to_j: number;
}

const addMove = (id: number, move: Move) => {
  return api.request<string>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/move/${id}`,
    data: move,
  });
};

export const AddMoveApi = {
  addMove,
};
