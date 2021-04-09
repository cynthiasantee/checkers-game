import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const login = (state: RootState) => state.login;

const data = createSelector(login, (login) => login.data);

const error = createSelector(login, (login) => login.error);

const status = createSelector(login, (login) => login.fetchStatus);

export const SelectLogin = {
  data,
  error,
  status,
};
