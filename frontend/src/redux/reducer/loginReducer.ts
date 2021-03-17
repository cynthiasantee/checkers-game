import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const loginSlice = createSlice({
  name: "login",
  initialState: defaultState<string>(),
  reducers: {
    loginLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    loginFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    loginReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  loginLoading,
  loginSuccess,
  loginFailed,
  loginReset,
} = loginSlice.actions;
export default loginSlice.reducer;
