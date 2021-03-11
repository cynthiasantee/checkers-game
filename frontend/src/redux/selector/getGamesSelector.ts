import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const games = (state: RootState) => state.getGames;

const data = createSelector(games, (games) => games.data);

const error = createSelector(games, (games) => games.error);

const status = createSelector(games, (games) => games.fetchStatus);

export const SelectGames = {
  data,
  error,
  status,
};
