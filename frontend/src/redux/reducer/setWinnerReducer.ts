import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const setWinnerSlice = createSlice({
  name: "set-winner",
  initialState: defaultState<string>(),
  reducers: {
    setWinnerLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    setWinnerSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    setWinnerFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    setWinnerReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  setWinnerLoading,
  setWinnerSuccess,
  setWinnerFailed,
  setWinnerReset,
} = setWinnerSlice.actions;
export default setWinnerSlice.reducer;
