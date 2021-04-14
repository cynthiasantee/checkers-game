import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const logoutSlice = createSlice({
  name: "logout",
  initialState: defaultState<string>(),
  reducers: {
    logoutLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    logoutSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    logoutFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    logoutReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  logoutLoading,
  logoutSuccess,
  logoutFailed,
  logoutReset,
} = logoutSlice.actions;
export default logoutSlice.reducer;
