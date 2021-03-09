import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../api/getGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const openGamesSlice = createSlice({
  name: "open-games",
  initialState: defaultState<Game[]>(),
  reducers: {
    getOpenGamesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getOpenGamesSuccess: (state, action: PayloadAction<Game[]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getOpenGamesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getOpenGamesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getOpenGamesLoading,
  getOpenGamesSuccess,
  getOpenGamesFailed,
  getOpenGamesReset,
} = openGamesSlice.actions;
export default openGamesSlice.reducer;
