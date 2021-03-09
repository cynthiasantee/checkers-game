import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const openGames = (state: RootState) => state.openGames;

const data = createSelector(openGames, (openGames) => openGames.data);

const error = createSelector(openGames, (openGames) => openGames.error);

const status = createSelector(openGames, (openGames) => openGames.fetchStatus);

export const SelectOpenGames = {
  data,
  error,
  status,
};
