import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const register = (state: RootState) => state.register;

const data = createSelector(register, (register) => register.data);

const error = createSelector(register, (register) => register.error);

const status = createSelector(register, (register) => register.fetchStatus);

export const SelectRegister = {
  data,
  error,
  status,
};
