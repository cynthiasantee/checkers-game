import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const changeTurn = (state: RootState) => state.changeTurn;

const data = createSelector(changeTurn, (changeTurn) => changeTurn.data);

const error = createSelector(changeTurn, (changeTurn) => changeTurn.error);

const status = createSelector(
  changeTurn,
  (changeTurn) => changeTurn.fetchStatus
);

export const SelectChangeTurn = {
  data,
  error,
  status,
};
