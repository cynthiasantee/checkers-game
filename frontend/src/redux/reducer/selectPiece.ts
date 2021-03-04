import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findPiece as findPieceFn } from "../../util/findPiece";
import { Location } from "../../util/move";
import { BoardSquare } from "../api/addMoveApi";

//this info is duplicate
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
