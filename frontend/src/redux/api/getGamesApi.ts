import { api } from "../../axios.config";
import { Game } from "../api/getGameApi";

const getGames = () => {
  return api.get<Game[]>(`/game/all`);
};

export const GamesApi = {
  getGames,
};
