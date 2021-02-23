import { api } from "../../axios.config";

export interface PlayerOne {
  player_one_id: number;
}

export interface NewGameId {
  new_game_id: number;
}

const createGame = (id: PlayerOne) => {
  return api.request<NewGameId>({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/game`,
    data: id,
  });
};

export const CreateGameApi = {
  createGame,
};
