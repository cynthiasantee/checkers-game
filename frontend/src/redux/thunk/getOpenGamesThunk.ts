import { serializeError } from "serialize-error";
import { getOpenGamesApi } from "../api/getOpenGamesApi";
import {
  getOpenGamesFailed,
  getOpenGamesLoading,
  getOpenGamesSuccess,
} from "../reducer/getOpenGamesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchOpenGames(myId: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getOpenGamesLoading());
      const { data } = await getOpenGamesApi.getOpenGames(myId);
      dispatch(getOpenGamesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getOpenGamesFailed(JSON.stringify(serializeError(error))));
    }
  };
}
