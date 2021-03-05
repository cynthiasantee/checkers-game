import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../api/getGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const gameSlice = createSlice({
  name: "game",
  initialState: defaultState<Game>(),
  reducers: {
    getGameLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getGameSuccess: (state, action: PayloadAction<Game>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getGameFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getGameReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getGameLoading,
  getGameSuccess,
  getGameFailed,
  getGameReset,
} = gameSlice.actions;
export default gameSlice.reducer;
