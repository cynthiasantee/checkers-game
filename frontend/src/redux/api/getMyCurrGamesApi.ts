import { api } from "../../axios.config";
import { Game } from "./getGameApi";

const getMyCurrGames = (myId: number) => {
  return api.get<Game[]>(`/game/curr`, { params: { myId } });
};

export const getMyCurrGamesApi = {
  getMyCurrGames,
};
