import { api } from "../../axios.config";
import { Player } from "./getPlayerApi";

const getPlayerInfo = () => {
  return api.get<Player>(`/player/info`);
};

export const PlayerInfoApi = {
  getPlayerInfo,
};
