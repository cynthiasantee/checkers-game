import { api } from "../../axios.config";

export interface Player {
  id: number;
  email: string;
  password: string;
}

const getPlayer = (id: number) => {
  return api.get<Player>(`/player/id/${id}`);
};

export const PlayerApi = {
  getPlayer,
};
