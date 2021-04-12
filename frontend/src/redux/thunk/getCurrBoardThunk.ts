import { serializeError } from "serialize-error";
import { Move } from "../api/addMoveApi";
import { CurrBoardApi } from "../api/getCurrBoardApi";
import {
  getCurrBoardFailed,
  getCurrBoardLoading,
  getCurrBoardSuccess,
} from "../reducer/getCurrBoardReducer";

import { AddMoveApi } from "../api/addMoveApi";
import {
  addMoveFailed,
  addMoveLoading,
  addMoveSuccess,
} from "../reducer/addMoveReducer";
import { CGThunkAction } from "./cgThunkAction";
import { hasWinner } from "../../util/hasWinner";

export function fetchCurrBoard(id: number, move?: Move): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      if (move) {
        try {
          dispatch(addMoveLoading());
          const { data } = await AddMoveApi.addMove(id, move);
          dispatch(addMoveSuccess(data));
        } catch (err) {
          const error = err?.response?.status === 400 ? "400" : err;
          dispatch(addMoveFailed(JSON.stringify(serializeError(error))));
        }
      }
      dispatch(getCurrBoardLoading());
      const { data } = await CurrBoardApi.getCurrBoard(id);
      dispatch(getCurrBoardSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getCurrBoardFailed(JSON.stringify(serializeError(error))));
    }
  };
}
