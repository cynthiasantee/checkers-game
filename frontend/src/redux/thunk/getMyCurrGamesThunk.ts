import { serializeError } from "serialize-error";
import { getMyCurrGamesApi } from "../api/getMyCurrGamesApi";
import {
  getMyCurrGamesFailed,
  getMyCurrGamesLoading,
  getMyCurrGamesSuccess,
} from "../reducer/getMyCurrGamesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchMyCurrGames(myId: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getMyCurrGamesLoading());
      const { data } = await getMyCurrGamesApi.getMyCurrGames(myId);
      dispatch(getMyCurrGamesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getMyCurrGamesFailed(JSON.stringify(serializeError(error))));
    }
  };
}
