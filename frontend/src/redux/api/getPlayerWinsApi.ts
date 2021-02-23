import { api } from "../../axios.config";

const getPlayerWins = (id: number) => {
  return api.get<number>(`/player/${id}/wins`);
};

export const PlayerWinsApi = {
  getPlayerWins,
};
