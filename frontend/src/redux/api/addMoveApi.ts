import { api } from "../../axios.config";

export interface Move {
  from_x: number;
  from_y: number;
  to_x: number;
  to_y: number;
}

const addMove = (id: number, move: Move) => {
  return api.request<Move>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/move/${id}`,
    data: move,
  });
};

export const AddMoveApi = {
  addMove,
};
