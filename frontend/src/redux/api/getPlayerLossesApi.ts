import { api } from "../../axios.config";

const getPlayerLosses = (id: number) => {
  return api.get<number>(`/player/total/${id}`);
};

export const PlayerLossesApi = {
  getPlayerLosses,
};
