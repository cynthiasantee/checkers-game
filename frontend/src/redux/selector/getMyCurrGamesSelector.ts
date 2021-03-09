import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const myCurrGames = (state: RootState) => state.myCurrGames;

const data = createSelector(myCurrGames, (myCurrGames) => myCurrGames.data);

const error = createSelector(myCurrGames, (myCurrGames) => myCurrGames.error);

const status = createSelector(
  myCurrGames,
  (myCurrGames) => myCurrGames.fetchStatus
);

export const SelectMyCurrGames = {
  data,
  error,
  status,
};
