import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const resetPassword = (state: RootState) => state.resetPassword;

const data = createSelector(
  resetPassword,
  (resetPassword) => resetPassword.data
);

const error = createSelector(
  resetPassword,
  (resetPassword) => resetPassword.error
);

const status = createSelector(
  resetPassword,
  (resetPassword) => resetPassword.fetchStatus
);

export const SelectResetPassword = {
  data,
  error,
  status,
};
