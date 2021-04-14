import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const resetPasswordSlice = createSlice({
  name: "reset-password",
  initialState: defaultState<string>(),
  reducers: {
    resetPasswordLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    resetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    resetPasswordFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    resetPasswordReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  resetPasswordLoading,
  resetPasswordSuccess,
  resetPasswordFailed,
  resetPasswordReset,
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
