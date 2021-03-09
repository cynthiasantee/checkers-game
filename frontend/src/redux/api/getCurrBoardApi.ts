import { api } from "../../axios.config";
import { BoardSquare } from "./addMoveApi";

const getCurrBoard = (id: number) => {
  return api.get<BoardSquare[][]>(`move/curr/${id}`);
};

export const CurrBoardApi = {
  getCurrBoard,
};
