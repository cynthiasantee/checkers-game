import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findPiece as findPieceFn } from "../../util/findPiece";
import { movePiece as movePieceFn } from "../../util/move";
import { Location } from "../../util/move";

export type Color = "white" | "black";

export interface Piece {
  id: number;
  color: Color;
  isDouble: boolean;
}

export interface BoardSquare {
  squareColor: Color;
  piece: Piece | null;
}

const initialBoard: BoardSquare[][] = [
  [
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 1, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 2, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 3, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 4, color: "white", isDouble: false } },
  ],
  [
    { squareColor: "black", piece: { id: 5, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 6, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 7, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 8, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
  ],
  [
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: { id: 9, color: "white", isDouble: false } },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 10, color: "white", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 11, color: "white", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 12, color: "white", isDouble: false },
    },
  ],
  [
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
  ],
  [
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
    { squareColor: "white", piece: null },
    { squareColor: "black", piece: null },
  ],
  [
    {
      squareColor: "black",
      piece: { id: 13, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 14, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 15, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 16, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
  ],
  [
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 17, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 18, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 19, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 20, color: "black", isDouble: false },
    },
  ],
  [
    {
      squareColor: "black",
      piece: { id: 21, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 22, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 23, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
    {
      squareColor: "black",
      piece: { id: 24, color: "black", isDouble: false },
    },
    { squareColor: "white", piece: null },
  ],
];

export interface MovePiecePayload {
  pieceId: number;
  location: Location;
}

const board = createSlice({
  name: "board",
  initialState: initialBoard,
  reducers: {
    movePiece: (state, newLocation: PayloadAction<MovePiecePayload>) => {
      const newBoard = [];
      for (let i = 0; i < state.length; i++) {
        newBoard[i] = state[i].slice();
      }

      const findPiece = findPieceFn(newLocation.payload.pieceId, newBoard);
      // console.log(findPiece);
      movePieceFn(findPiece, newLocation.payload.location, newBoard);

      state = newBoard;

      // console.log("piece moved");
    },
  },
});

export const { movePiece } = board.actions;
export default board.reducer;
