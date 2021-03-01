import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const addMove = (state: RootState) => state.addMove;

const data = createSelector(addMove, (addMove) => addMove.data);

const error = createSelector(addMove, (addMove) => addMove.error);

const status = createSelector(addMove, (addMove) => addMove.fetchStatus);

export const SelectAddMove = {
  data,
  error,
  status,
};
