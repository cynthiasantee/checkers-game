import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const playerTotalGamesSlice = createSlice({
  name: "player-wins",
  initialState: defaultState<number>(),
  reducers: {
    getPlayerTotalGamesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getPlayerTotalGamesSuccess: (state, action: PayloadAction<number>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getPlayerTotalGamesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getPlayerTotalGamesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getPlayerTotalGamesLoading,
  getPlayerTotalGamesSuccess,
  getPlayerTotalGamesFailed,
  getPlayerTotalGamesReset,
} = playerTotalGamesSlice.actions;
export default playerTotalGamesSlice.reducer;
