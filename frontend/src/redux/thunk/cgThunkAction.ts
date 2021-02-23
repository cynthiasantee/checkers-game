import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CGThunkAction<T> = ThunkAction<T, RootState, void, Action>;
