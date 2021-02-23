import { PlayerTotalGamesApi } from "../api/getPlayerTotalGamesApi";
import {
  getPlayerTotalGamesFailed,
  getPlayerTotalGamesLoading,
  getPlayerTotalGamesSuccess,
} from "../reducer/getPlayerTotalGamesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchPlayerTotalGames(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getPlayerTotalGamesLoading());
      const { data } = await PlayerTotalGamesApi.getPlayerTotalGames(id);
      dispatch(getPlayerTotalGamesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getPlayerTotalGamesFailed(error));
    }
  };
}
