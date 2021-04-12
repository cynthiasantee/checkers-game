import { serializeError } from "serialize-error";
import { Winner, SetWinnerApi } from "../api/setWinnerApi";
import {
  setWinnerFailed,
  setWinnerLoading,
  setWinnerSuccess,
} from "../reducer/setWinnerReducer";
import { CGThunkAction } from "./cgThunkAction";

export function setWinner(id: number, winner: Winner): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(setWinnerLoading());
      const { data } = await SetWinnerApi.setWinner(id, {
        winner_id: winner.winner_id,
      });
      dispatch(setWinnerSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(setWinnerFailed(JSON.stringify(serializeError(error))));
    }
  };
}
