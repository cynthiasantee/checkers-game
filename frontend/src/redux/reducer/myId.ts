import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const myId = createSlice({
  name: "my id",
  initialState: null as number | null,
  reducers: {
    setMyId: (state, location: PayloadAction<number>) => {
      state = location.payload;
      return state;
    },
  },
});

export const { setMyId } = myId.actions;
export default myId.reducer;
