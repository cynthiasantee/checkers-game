import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";
import { Turn } from "../api/changeTurnApi";

const changeTurnSlice = createSlice({
  name: "turn",
  initialState: defaultState<Turn>(),
  reducers: {
    changeTurnLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    changeTurnSuccess: (state, action: PayloadAction<Turn>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    changeTurnFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    changeTurnReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  changeTurnLoading,
  changeTurnSuccess,
  changeTurnFailed,
  changeTurnReset,
} = changeTurnSlice.actions;
export default changeTurnSlice.reducer;
