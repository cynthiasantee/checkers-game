import { api } from "../../axios.config";

export interface Game {
  id: number;
  player_one_id: number;
  player_two_id: number | null;
  winner_id: number | null;
}

const getGame = (id: number) => {
  return api.get<Game>(`/game/${id}`);
};

export const GameApi = {
  getGame,
};
