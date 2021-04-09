import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const registerSlice = createSlice({
  name: "register",
  initialState: defaultState<string>(),
  reducers: {
    registerLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    registerFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    registerReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  registerLoading,
  registerSuccess,
  registerFailed,
  registerReset,
} = registerSlice.actions;
export default registerSlice.reducer;
