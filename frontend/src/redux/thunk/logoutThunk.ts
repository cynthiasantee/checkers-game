import { serializeError } from "serialize-error";
// import { ChangeTurnApi, OtherPlayerId, Turn } from "../api/changeTurnApi";
import { LogoutApi } from "../api/logoutApi";
import {
  logoutFailed,
  logoutLoading,
  logoutSuccess,
} from "../reducer/logoutReducer";
import { CGThunkAction } from "./cgThunkAction";

export function logout(): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(logoutLoading());
      const { data } = await LogoutApi.logout();
      dispatch(logoutSuccess(data));
      window.location.href = data;
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(logoutFailed(JSON.stringify(serializeError(error))));
    }
  };
}
