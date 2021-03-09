import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../api/getGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const openGamesSlice = createSlice({
  name: "open-games",
  initialState: defaultState<Game[]>(),
  reducers: {
    getMyCurrGamesLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getMyCurrGamesSuccess: (state, action: PayloadAction<Game[]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getMyCurrGamesFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getMyCurrGamesReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getMyCurrGamesLoading,
  getMyCurrGamesSuccess,
  getMyCurrGamesFailed,
  getMyCurrGamesReset,
} = openGamesSlice.actions;
export default openGamesSlice.reducer;
