import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyKnownError } from "../util/myKnownError";
import { defaultState } from "../util/defaultState";

const setColorsSlice = createSlice({
  name: "set-colors",
  initialState: defaultState<string>(),
  reducers: {
    setColorsLoading: (state) => {
      state.fetchStatus = "pending";
      return state;
    },
    setColorsSuccess: (state, action: PayloadAction<string>) => {
      state.fetchStatus = "success";
      state.data = action.payload;
      return state;
    },
    setColorsFailed: (state, action: PayloadAction<MyKnownError>) => {
      state.fetchStatus = "failed";
      state.error = action.payload;
      return state;
    },
    setColorsReset: (state) => {
      state = defaultState();
      return state;
    },
  },
});

export const {
  setColorsLoading,
  setColorsSuccess,
  setColorsFailed,
  setColorsReset,
} = setColorsSlice.actions;
export default setColorsSlice.reducer;
