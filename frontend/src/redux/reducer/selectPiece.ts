import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../util/move";

export interface PieceInfo {
  location: Location;
}

type SelectedPiece = Location | null;

const selectedPieceLocation = createSlice({
  name: "selected-piece-location",
  initialState: null as SelectedPiece,
  reducers: {
    selectPiece: (state, location: PayloadAction<Location>) => {
      state = location.payload;
      return state;
    },
    deselectPiece: (state) => {
      state = null;
      return state;
    },
  },
});

export const { selectPiece, deselectPiece } = selectedPieceLocation.actions;
export default selectedPieceLocation.reducer;
