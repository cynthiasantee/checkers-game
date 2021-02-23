import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const playerWins = (state: RootState) => state.playerWins;

const data = createSelector(playerWins, (playerWins) => playerWins.data);

const error = createSelector(playerWins, (playerWins) => playerWins.error);

const status = createSelector(
  playerWins,
  (playerWins) => playerWins.fetchStatus
);

export const SelectPlayerWins = {
  data,
  error,
  status,
};
