import { serializeError } from "serialize-error";
import { GamesApi } from "../api/getGamesApi";
import {
  getGamesFailed,
  getGamesLoading,
  getGamesSuccess,
} from "../reducer/getGamesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchGames(): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getGamesLoading());
      const { data } = await GamesApi.getGames();
      dispatch(getGamesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getGamesFailed(JSON.stringify(serializeError(error))));
    }
  };
}
