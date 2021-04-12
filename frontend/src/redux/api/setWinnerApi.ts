import { api } from "../../axios.config";

export interface Winner {
  winner_id: number;
}

const setWinner = (id: number, winner: Winner) => {
  return api.request<string>({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `/game/winner/${id}`,
    data: winner,
  });
};

export const SetWinnerApi = {
  setWinner,
};
