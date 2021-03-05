import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const currBoard = (state: RootState) => state.currBoard;

const data = createSelector(currBoard, (currBoard) => currBoard.data);

const error = createSelector(currBoard, (currBoard) => currBoard.error);

const status = createSelector(currBoard, (currBoard) => currBoard.fetchStatus);

export const SelectCurrBoard = {
  data,
  error,
  status,
};
