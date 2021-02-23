import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const playerWinsSlice = createSlice({
  name: "player-wins",
  initialState: defaultState<number>(),
  reducers: {
    getPlayerWinsLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getPlayerWinsSuccess: (state, action: PayloadAction<number>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getPlayerWinsFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getPlayerWinsReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getPlayerWinsLoading,
  getPlayerWinsSuccess,
  getPlayerWinsFailed,
  getPlayerWinsReset,
} = playerWinsSlice.actions;
export default playerWinsSlice.reducer;
