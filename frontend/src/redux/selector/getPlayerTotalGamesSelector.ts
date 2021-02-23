import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const playerTotalGames = (state: RootState) => state.playerTotalGames;

const data = createSelector(
  playerTotalGames,
  (playerTotalGames) => playerTotalGames.data
);

const error = createSelector(
  playerTotalGames,
  (playerTotalGames) => playerTotalGames.error
);

const status = createSelector(
  playerTotalGames,
  (playerTotalGames) => playerTotalGames.fetchStatus
);

export const SelectPlayerTotalGames = {
  data,
  error,
  status,
};
