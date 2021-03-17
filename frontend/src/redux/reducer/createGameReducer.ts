import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewGameId } from "../api/createGameApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const createGameSlice = createSlice({
  name: "current-game",
  initialState: defaultState<NewGameId>(),
  reducers: {
    createGameLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    createGameSuccess: (state, action: PayloadAction<NewGameId>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    createGameFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    createGameReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  createGameLoading,
  createGameSuccess,
  createGameFailed,
  createGameReset,
} = createGameSlice.actions;
export default createGameSlice.reducer;
