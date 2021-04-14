import { serializeError } from "serialize-error";
// import { ChangeTurnApi, OtherPlayerId, Turn } from "../api/changeTurnApi";
import { ResetPassword, resetPasswordApi } from "../api/resetPasswordApi";
import {
  resetPasswordFailed,
  resetPasswordLoading,
  resetPasswordSuccess,
} from "../reducer/resetPasswordReducer";
import { CGThunkAction } from "./cgThunkAction";

export function resetPassword(
  resetPassword: ResetPassword
): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordLoading());
      const { data } = await resetPasswordApi.resetPassword(resetPassword);
      dispatch(resetPasswordSuccess(data));
      window.location.href = data;
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(resetPasswordFailed(JSON.stringify(serializeError(error))));
    }
  };
}
