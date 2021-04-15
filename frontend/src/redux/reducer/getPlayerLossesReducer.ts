import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const playerLossesSlice = createSlice({
  name: "player-wins",
  initialState: defaultState<number>(),
  reducers: {
    getPlayerLossesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getPlayerLossesSuccess: (state, action: PayloadAction<number>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getPlayerLossesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getPlayerLossesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getPlayerLossesLoading,
  getPlayerLossesSuccess,
  getPlayerLossesFailed,
  getPlayerLossesReset,
} = playerLossesSlice.actions;
export default playerLossesSlice.reducer;
