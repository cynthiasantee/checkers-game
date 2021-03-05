import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const game = (state: RootState) => state.getGame;

const data = createSelector(game, (game) => game.data);

const error = createSelector(game, (game) => game.error);

const status = createSelector(game, (game) => game.fetchStatus);

export const SelectGame = {
  data,
  error,
  status,
};
