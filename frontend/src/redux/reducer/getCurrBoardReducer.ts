import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";
import { BoardSquare } from "../api/addMoveApi";

const currBoardSlice = createSlice({
  name: "current-board",
  initialState: defaultState<BoardSquare[][]>(),
  reducers: {
    getCurrBoardLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    getCurrBoardSuccess: (state, action: PayloadAction<BoardSquare[][]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    getCurrBoardFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    getCurrBoardReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getCurrBoardLoading,
  getCurrBoardSuccess,
  getCurrBoardFailed,
  getCurrBoardReset,
} = currBoardSlice.actions;
export default currBoardSlice.reducer;
