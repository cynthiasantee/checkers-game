import { BoardSquare } from "../redux/api/addMoveApi";

export const INITIAL_BOARD: BoardSquare[][] = [
  [
    { squareColor: "white", piece: null, location: [0, 0] },
    {
      squareColor: "black",
      piece: { id: 1, color: "white", isDouble: false },
      location: [0, 1],
    },
    { squareColor: "white", piece: null, location: [0, 2] },
    {
      squareColor: "black",
      piece: { id: 2, color: "white", isDouble: false },
      location: [0, 3],
    },
    { squareColor: "white", piece: null, location: [0, 4] },
    {
      squareColor: "black",
      piece: { id: 3, color: "white", isDouble: false },
      location: [0, 5],
    },
    { squareColor: "white", piece: null, location: [0, 6] },
    {
      squareColor: "black",
      piece: { id: 4, color: "white", isDouble: false },
      location: [0, 7],
    },
  ],
  [
    {
      squareColor: "black",
      piece: { id: 5, color: "white", isDouble: false },
      location: [1, 0],
    },
    { squareColor: "white", piece: null, location: [1, 1] },
    {
      squareColor: "black",
      piece: { id: 6, color: "white", isDouble: false },
      location: [1, 2],
    },
    { squareColor: "white", piece: null, location: [1, 3] },
    {
      squareColor: "black",
      piece: { id: 7, color: "white", isDouble: false },
      location: [1, 4],
    },
    { squareColor: "white", piece: null, location: [1, 5] },
    {
      squareColor: "black",
      piece: { id: 8, color: "white", isDouble: false },
      location: [1, 6],
    },
    { squareColor: "white", piece: null, location: [1, 7] },
  ],
  [
    { squareColor: "white", piece: null, location: [2, 0] },
    {
      squareColor: "black",
      piece: { id: 9, color: "white", isDouble: false },
      location: [2, 1],
    },
    { squareColor: "white", piece: null, location: [2, 2] },
    {
      squareColor: "black",
      piece: { id: 10, color: "white", isDouble: false },
      location: [2, 3],
    },
    { squareColor: "white", piece: null, location: [2, 4] },
    {
      squareColor: "black",
      piece: { id: 11, color: "white", isDouble: false },
      location: [2, 5],
    },
    { squareColor: "white", piece: null, location: [2, 6] },
    {
      squareColor: "black",
      piece: { id: 12, color: "white", isDouble: false },
      location: [2, 7],
    },
  ],
  [
    { squareColor: "black", piece: null, location: [3, 0] },
    { squareColor: "white", piece: null, location: [3, 1] },
    { squareColor: "black", piece: null, location: [3, 2] },
    { squareColor: "white", piece: null, location: [3, 3] },
    { squareColor: "black", piece: null, location: [3, 4] },
    { squareColor: "white", piece: null, location: [3, 5] },
    { squareColor: "black", piece: null, location: [3, 6] },
    { squareColor: "white", piece: null, location: [3, 7] },
  ],
  [
    { squareColor: "white", piece: null, location: [4, 0] },
    { squareColor: "black", piece: null, location: [4, 1] },
    { squareColor: "white", piece: null, location: [4, 2] },
    { squareColor: "black", piece: null, location: [4, 3] },
    { squareColor: "white", piece: null, location: [4, 4] },
    { squareColor: "black", piece: null, location: [4, 5] },
    { squareColor: "white", piece: null, location: [4, 6] },
    { squareColor: "black", piece: null, location: [4, 7] },
  ],
  [
    {
      squareColor: "black",
      piece: { id: 13, color: "black", isDouble: false },
      location: [5, 0],
    },
    { squareColor: "white", piece: null, location: [5, 1] },
    {
      squareColor: "black",
      piece: { id: 14, color: "black", isDouble: false },
      location: [5, 2],
    },
    { squareColor: "white", piece: null, location: [5, 3] },
    {
      squareColor: "black",
      piece: { id: 15, color: "black", isDouble: false },
      location: [5, 4],
    },
    { squareColor: "white", piece: null, location: [5, 5] },
    {
      squareColor: "black",
      piece: { id: 16, color: "black", isDouble: false },
      location: [5, 6],
    },
    { squareColor: "white", piece: null, location: [5, 7] },
  ],
  [
    { squareColor: "white", piece: null, location: [6, 0] },
    {
      squareColor: "black",
      piece: { id: 17, color: "black", isDouble: false },
      location: [6, 1],
    },
    { squareColor: "white", piece: null, location: [6, 2] },
    {
      squareColor: "black",
      piece: { id: 18, color: "black", isDouble: false },
      location: [6, 3],
    },
    { squareColor: "white", piece: null, location: [6, 4] },
    {
      squareColor: "black",
      piece: { id: 19, color: "black", isDouble: false },
      location: [6, 5],
    },
    { squareColor: "white", piece: null, location: [6, 6] },
    {
      squareColor: "black",
      piece: { id: 20, color: "black", isDouble: false },
      location: [6, 7],
    },
  ],
  [
    {
      squareColor: "black",
      piece: { id: 21, color: "black", isDouble: false },
      location: [7, 0],
    },
    { squareColor: "white", piece: null, location: [7, 1] },
    {
      squareColor: "black",
      piece: { id: 22, color: "black", isDouble: false },
      location: [7, 2],
    },
    { squareColor: "white", piece: null, location: [7, 3] },
    {
      squareColor: "black",
      piece: { id: 23, color: "black", isDouble: false },
      location: [7, 4],
    },
    { squareColor: "white", piece: null, location: [7, 5] },
    {
      squareColor: "black",
      piece: { id: 24, color: "black", isDouble: false },
      location: [7, 6],
    },
    { squareColor: "white", piece: null, location: [7, 7] },
  ],
];
