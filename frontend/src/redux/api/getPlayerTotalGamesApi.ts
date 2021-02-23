import { api } from "../../axios.config";

const getPlayerTotalGames = (id: number) => {
  return api.get<number>(`/player/${id}/total`);
};

export const PlayerTotalGamesApi = {
  getPlayerTotalGames,
};
