import { api } from "../../axios.config";

export interface Turn {
  turn: number;
}

export interface OtherPlayerId {
  other_player_id: number;
}

const changeTurn = (other_player_id: OtherPlayerId, game_id: number) => {
  return api.request<Turn>({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `/game/turn/${game_id}`,
    data: other_player_id,
  });
};

export const ChangeTurnApi = {
  changeTurn,
};
