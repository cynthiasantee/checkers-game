import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const player = (state: RootState) => state.player;

const data = createSelector(player, (player) => player.data);

const error = createSelector(player, (player) => player.error);

const status = createSelector(player, (player) => player.fetchStatus);

export const SelectPlayer = {
  data,
  error,
  status,
};
