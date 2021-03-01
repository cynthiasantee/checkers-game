import { serializeError } from "serialize-error";
import { AddMoveApi, Move } from "../api/addMoveApi";
import {
  addMoveFailed,
  addMoveLoading,
  addMoveSuccess,
} from "../reducer/addMoveReducer";
import { CGThunkAction } from "./cgThunkAction";

export function addMove(id: number, move: Move): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(addMoveLoading());
      const { data } = await AddMoveApi.addMove(id, move);
      dispatch(addMoveSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(addMoveFailed(JSON.stringify(serializeError(error))));
    }
  };
}
