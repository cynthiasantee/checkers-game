import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../../pages/page";

const pageSlice = createSlice({
  name: "page",
  initialState: "login" as Page,
  reducers: {
    changePage: (state, action: PayloadAction<Page>) => {
      return action.payload;
    },
  },
});

export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;
