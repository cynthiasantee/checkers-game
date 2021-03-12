import { api } from "../../axios.config";
import { Color } from "./addMoveApi";

export interface SetColor {
  player_one_id: number;
  player_id: number;
  color: Color;
}

const setColors = (colorInfo: SetColor, game_id: number) => {
  return api.request<string>({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `/game/colors/${game_id}`,
    data: colorInfo,
  });
};

export const SetColorsApi = {
  setColors,
};
