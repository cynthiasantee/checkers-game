import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../api/getGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const openGamesSlice = createSlice({
  name: "open-games",
  initialState: defaultState<Game[]>(),
  reducers: {
    getEmptyGamesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getEmptyGamesSuccess: (state, action: PayloadAction<Game[]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getEmptyGamesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getEmptyGamesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getEmptyGamesLoading,
  getEmptyGamesSuccess,
  getEmptyGamesFailed,
  getEmptyGamesReset,
} = openGamesSlice.actions;
export default openGamesSlice.reducer;
