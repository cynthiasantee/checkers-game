import { serializeError } from "serialize-error";
import { SetColor, SetColorsApi } from "../api/setColorsApi";
import {
  setColorsFailed,
  setColorsLoading,
  setColorsSuccess,
} from "../reducer/setColorsReducer";

import { GameApi } from "../api/getGameApi";
import {
  getGameFailed,
  getGameLoading,
  getGameSuccess,
} from "../reducer/getGameReducer";

import { CGThunkAction } from "./cgThunkAction";

export function setColors(
  colorInfo: SetColor,
  game_id: number
): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(setColorsLoading());
      const { data } = await SetColorsApi.setColors(colorInfo, game_id);
      dispatch(setColorsSuccess(data));

      try {
        dispatch(getGameLoading());
        const { data } = await GameApi.getGame(game_id);
        dispatch(getGameSuccess(data));
      } catch (err) {
        const error = err?.response?.status === 400 ? "400" : err;
        dispatch(getGameFailed(JSON.stringify(serializeError(error))));
      }
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(setColorsFailed(JSON.stringify(serializeError(error))));
    }
  };
}
