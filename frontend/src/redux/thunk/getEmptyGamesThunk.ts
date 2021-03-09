import { serializeError } from "serialize-error";
import { getEmptyGamesApi } from "../api/getEmptyGamesApi";
import {
  getEmptyGamesFailed,
  getEmptyGamesLoading,
  getEmptyGamesSuccess,
} from "../reducer/getEmptyGamesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchEmptyGames(myId: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getEmptyGamesLoading());
      const { data } = await getEmptyGamesApi.getEmptyGames(myId);
      dispatch(getEmptyGamesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getEmptyGamesFailed(JSON.stringify(serializeError(error))));
    }
  };
}
