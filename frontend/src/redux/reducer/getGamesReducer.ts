import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../api/getGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const gamesSlice = createSlice({
  name: "all games",
  initialState: defaultState<Game[]>(),
  reducers: {
    getGamesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getGamesSuccess: (state, action: PayloadAction<Game[]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getGamesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getGamesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getGamesLoading,
  getGamesSuccess,
  getGamesFailed,
  getGamesReset,
} = gamesSlice.actions;
export default gamesSlice.reducer;
