import { serializeError } from "serialize-error";
import { CurrBoardApi } from "../api/getCurrBoardApi";
import {
  getCurrBoardFailed,
  getCurrBoardLoading,
  getCurrBoardSuccess,
} from "../reducer/getCurrBoardReducer";
import { CGThunkAction } from "./cgThunkAction";

export function fetchCurrBoard(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getCurrBoardLoading());
      const { data } = await CurrBoardApi.getCurrBoard(id);
      dispatch(getCurrBoardSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getCurrBoardFailed(JSON.stringify(serializeError(error))));
    }
  };
}
