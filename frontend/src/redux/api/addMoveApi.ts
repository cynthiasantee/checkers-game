import { api } from "../../axios.config";

export type Color = "white" | "black";

export interface Piece {
  id: number;
  color: Color | string;
  isDouble: boolean;
}

export interface BoardSquare {
  squareColor: Color | string;
  piece: Piece | null;
}

export interface Move {
  from_i: number;
  from_j: number;
  to_i: number;
  to_j: number;
}

const addMove = (id: number, move: Move) => {
  return api.request<BoardSquare[][]>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/move/${id}`,
    data: move,
  });
};

export const AddMoveApi = {
  addMove,
};
