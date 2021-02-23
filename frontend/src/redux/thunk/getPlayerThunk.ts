import { PlayerApi } from "../api/getPlayerApi";
import {
  getPlayerFailed,
  getPlayerLoading,
  getPlayerSuccess,
} from "../reducer/getPlayerReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchPlayer(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getPlayerLoading());
      const { data } = await PlayerApi.getPlayer(id);
      dispatch(getPlayerSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getPlayerFailed(error));
    }
  };
}
