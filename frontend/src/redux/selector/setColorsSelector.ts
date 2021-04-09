import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const setColors = (state: RootState) => state.setColors;

const data = createSelector(setColors, (setColors) => setColors.data);

const error = createSelector(setColors, (setColors) => setColors.error);

const status = createSelector(setColors, (setColors) => setColors.fetchStatus);

export const SelectSetColors = {
  data,
  error,
  status,
};
