import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const logout = (state: RootState) => state.logout;

const data = createSelector(logout, (logout) => logout.data);

const error = createSelector(logout, (logout) => logout.error);

const status = createSelector(logout, (logout) => logout.fetchStatus);

export const SelectLogout = {
  data,
  error,
  status,
};
