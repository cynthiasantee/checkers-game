import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardSquare, Move } from "../api/addMoveApi";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";
import _ from "lodash";
import { INITIAL_BOARD } from "../../util/initialBoard";

const addMoveSlice = createSlice({
  name: "board",
  initialState: defaultState<BoardSquare[][]>(),
  reducers: {
    getInitialBoard: (state) => {
      state.data = _.cloneDeep(INITIAL_BOARD);
      return state;
    },
    addMoveLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    addMoveSuccess: (state, action: PayloadAction<BoardSquare[][]>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    addMoveFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    addMoveReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  getInitialBoard,
  addMoveLoading,
  addMoveSuccess,
  addMoveFailed,
  addMoveReset,
} = addMoveSlice.actions;
export default addMoveSlice.reducer;
