import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const setWinner = (state: RootState) => state.setWinner;

const data = createSelector(setWinner, (setWinner) => setWinner.data);

const error = createSelector(setWinner, (setWinner) => setWinner.error);

const status = createSelector(setWinner, (setWinner) => setWinner.fetchStatus);

export const SelectSetWinner = {
  data,
  error,
  status,
};
