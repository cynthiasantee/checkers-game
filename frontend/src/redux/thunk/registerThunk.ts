import { serializeError } from "serialize-error";
import { Register, RegisterApi } from "../api/registerApi";
import {
  registerFailed,
  registerLoading,
  registerSuccess,
} from "../reducer/registerReducer";
import { CGThunkAction } from "./cgThunkAction";

export function register(register: Register): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(registerLoading());
      const { data } = await RegisterApi.register(register);
      dispatch(registerSuccess(data));
      window.location.href = data;
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(registerFailed(JSON.stringify(serializeError(error))));
    }
  };
}
