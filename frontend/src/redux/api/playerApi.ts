import { api } from "../../../axios.config";

export interface Player {
  id: number;
  email: string;
  password: string;
}

const getPlayer = async (id: number) => {
  return api.get<Player>(`/player/${id}`);
};

export const PlayerApi = {
  getPlayer,
};
