import { serializeError } from "serialize-error";
import { PlayerInfoApi } from "../api/getPlayerInfo";
import {
  getPlayerFailed,
  getPlayerLoading,
  getPlayerSuccess,
} from "../reducer/getPlayerReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchPlayerInfo(): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getPlayerLoading());
      const { data } = await PlayerInfoApi.getPlayerInfo();
      dispatch(getPlayerSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getPlayerFailed(JSON.stringify(serializeError(error))));
    }
  };
}
