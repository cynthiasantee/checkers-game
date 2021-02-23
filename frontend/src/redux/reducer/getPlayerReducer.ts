import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../api/getPlayerApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const playerSlice = createSlice({
  name: "player",
  initialState: defaultState<Player>(),
  reducers: {
    getPlayerLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getPlayerSuccess: (state, action: PayloadAction<Player>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getPlayerFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getPlayerReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getPlayerLoading,
  getPlayerSuccess,
  getPlayerFailed,
  getPlayerReset,
} = playerSlice.actions;
export default playerSlice.reducer;
