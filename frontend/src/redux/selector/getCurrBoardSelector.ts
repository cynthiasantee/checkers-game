import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { hasWinner } from "../../util/hasWinner";

const currBoard = (state: RootState) => state.currBoard;

const data = createSelector(currBoard, (currBoard) => currBoard.data);

const winner = createSelector(data, (data) =>
  data ? hasWinner(data) : "NO_WINNER"
);

const error = createSelector(currBoard, (currBoard) => currBoard.error);

const status = createSelector(currBoard, (currBoard) => currBoard.fetchStatus);

export const SelectCurrBoard = {
  data,
  error,
  status,
  winner,
};
