import { api } from "../../axios.config";
import { Game } from "./getGameApi";

const getEmptyGames = (myId: number) => {
  return api.get<Game[]>(`/game/empty`, { params: { myId } });
};

export const getEmptyGamesApi = {
  getEmptyGames,
};
