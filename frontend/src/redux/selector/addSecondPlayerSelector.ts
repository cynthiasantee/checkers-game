import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const addSecondPlayer = (state: RootState) => state.addSecondPlayer;

const data = createSelector(
  addSecondPlayer,
  (addSecondPlayer) => addSecondPlayer.data
);

const error = createSelector(
  addSecondPlayer,
  (addSecondPlayer) => addSecondPlayer.error
);

const status = createSelector(
  addSecondPlayer,
  (addSecondPlayer) => addSecondPlayer.fetchStatus
);

export const SelectAddSecondPlayer = {
  data,
  error,
  status,
};
