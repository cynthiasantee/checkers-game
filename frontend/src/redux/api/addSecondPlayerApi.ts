import { api } from "../../axios.config";

export interface SecondPlayer {
  player_two_id: number;
}

const addSecondPlayer = (player: SecondPlayer, id: number) => {
  return api.request<SecondPlayer>({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `/game/player/${id}`,
    data: player,
  });
};

export const AddSecondPlayerApi = {
  addSecondPlayer,
};
