import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const emptyGames = (state: RootState) => state.myEmptyGames;

const data = createSelector(emptyGames, (emptyGames) => emptyGames.data);

const error = createSelector(emptyGames, (emptyGames) => emptyGames.error);

const status = createSelector(
  emptyGames,
  (emptyGames) => emptyGames.fetchStatus
);

export const SelectEmptyGames = {
  data,
  error,
  status,
};
