import { serializeError } from "serialize-error";
// import { ChangeTurnApi, OtherPlayerId, Turn } from "../api/changeTurnApi";
import { Login, LoginApi } from "../api/loginApi";
import {
  loginFailed,
  loginLoading,
  loginSuccess,
} from "../reducer/loginReducer";
import { CGThunkAction } from "./cgThunkAction";

export function login(login: Login): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(loginLoading());
      const { data } = await LoginApi.login(login);
      dispatch(loginSuccess(data));
      window.location.href = data;
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(loginFailed(JSON.stringify(serializeError(error))));
    }
  };
}
