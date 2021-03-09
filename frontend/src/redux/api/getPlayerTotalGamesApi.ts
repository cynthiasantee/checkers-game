import { api } from "../../axios.config";

const getPlayerTotalGames = (id: number) => {
  return api.get<number>(`/player/total/${id}`);
};

export const PlayerTotalGamesApi = {
  getPlayerTotalGames,
};
