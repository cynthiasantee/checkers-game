import { serializeError } from "serialize-error";
import { PlayerLossesApi } from "../api/getPlayerLossesApi";
import {
  getPlayerLossesFailed,
  getPlayerLossesLoading,
  getPlayerLossesSuccess,
} from "../reducer/getPlayerLossesReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchPlayerLosses(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getPlayerLossesLoading());
      const { data } = await PlayerLossesApi.getPlayerLosses(id);
      dispatch(getPlayerLossesSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getPlayerLossesFailed(JSON.stringify(serializeError(error))));
    }
  };
}
