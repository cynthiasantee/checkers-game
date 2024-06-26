import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const addMoveSlice = createSlice({
  name: "move",
  initialState: defaultState<string>(),
  reducers: {
    addMoveLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    addMoveSuccess: (state, action: PayloadAction<string>) => {
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
  addMoveLoading,
  addMoveSuccess,
  addMoveFailed,
  addMoveReset,
} = addMoveSlice.actions;
export default addMoveSlice.reducer;
