import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const playerLosses = (state: RootState) => state.playerLosses;

const data = createSelector(playerLosses, (playerLosses) => playerLosses.data);

const error = createSelector(
  playerLosses,
  (playerLosses) => playerLosses.error
);

const status = createSelector(
  playerLosses,
  (playerLosses) => playerLosses.fetchStatus
);

export const SelectPlayerLosses = {
  data,
  error,
  status,
};
