import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";
import { SecondPlayer } from "../api/addSecondPlayerApi";

const addSecondPlayerSlice = createSlice({
  name: "second-player",
  initialState: defaultState<SecondPlayer>(),
  reducers: {
    addSecondPlayerLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    addSecondPlayerSuccess: (state, action: PayloadAction<SecondPlayer>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    addSecondPlayerFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    addSecondPlayerReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  addSecondPlayerLoading,
  addSecondPlayerSuccess,
  addSecondPlayerFailed,
  addSecondPlayerReset,
} = addSecondPlayerSlice.actions;
export default addSecondPlayerSlice.reducer;
