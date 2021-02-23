import { serializeError } from "serialize-error";
import { PlayerWinsApi } from "../api/getPlayerWinsApi";
import {
  getPlayerWinsFailed,
  getPlayerWinsLoading,
  getPlayerWinsSuccess,
} from "../reducer/getPlayerWinsReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchPlayerWins(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getPlayerWinsLoading());
      const { data } = await PlayerWinsApi.getPlayerWins(id);
      dispatch(getPlayerWinsSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getPlayerWinsFailed(JSON.stringify(serializeError(error))));
    }
  };
}
