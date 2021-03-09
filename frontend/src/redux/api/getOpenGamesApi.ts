import { api } from "../../axios.config";
import { Game } from "./getGameApi";

const getOpenGames = (myId: number) => {
  return api.get<Game[]>(`/game/open`, { params: { myId } });
};

export const getOpenGamesApi = {
  getOpenGames,
};
