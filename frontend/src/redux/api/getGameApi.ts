import { api } from "../../axios.config";

export interface Game {
  id: number;
  player_one_id: number;
  player_two_id: number | null;
  player_one_username: string;
  player_two_username: string | null;
  player_one_color: string | null;
  player_two_color: string | null;
  winner_id: number | null;
  turn: number;
}

const getGame = (id: number) => {
  return api.get<Game>(`/game/id/${id}`);
};

export const GameApi = {
  getGame,
};
