import { api } from "../../axios.config";

const getPlayerWins = (id: number) => {
  return api.get<number>(`/player/wins/${id}`);
};

export const PlayerWinsApi = {
  getPlayerWins,
};
