import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const createGame = (state: RootState) => state.createGame;

const data = createSelector(createGame, (createGame) => createGame.data);

const error = createSelector(createGame, (createGame) => createGame.error);

const status = createSelector(
  createGame,
  (createGame) => createGame.fetchStatus
);

export const SelectCreateGame = {
  data,
  error,
  status,
};
