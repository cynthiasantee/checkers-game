import { api } from "../../axios.config";

export interface Player {
  player_id: number;
  player_username: string;
}

const getPlayer = (id: number) => {
  return api.get<Player>(`/player/id/${id}`);
};

export const PlayerApi = {
  getPlayer,
};
