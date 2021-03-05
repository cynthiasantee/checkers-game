import { serializeError } from "serialize-error";
import { GameApi } from "../api/getGameApi";
import {
  getGameFailed,
  getGameLoading,
  getGameSuccess,
} from "../reducer/getGameReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchGame(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getGameLoading());
      const { data } = await GameApi.getGame(id);
      dispatch(getGameSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getGameFailed(JSON.stringify(serializeError(error))));
    }
  };
}
