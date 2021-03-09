import { serializeError } from "serialize-error";
import { AddSecondPlayerApi } from "../api/addSecondPlayerApi";
import {
  addSecondPlayerFailed,
  addSecondPlayerLoading,
  addSecondPlayerSuccess,
} from "../reducer/addSecondPlayerReducer";
import { CGThunkAction } from "./cgThunkAction";
import { SecondPlayer } from "../api/addSecondPlayerApi";

export function addSecondPlayer(
  player: SecondPlayer,
  id: number
): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(addSecondPlayerLoading());
      const { data } = await AddSecondPlayerApi.addSecondPlayer(
        {
          player_two_id: player.player_two_id,
        },
        id
      );
      dispatch(addSecondPlayerSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(addSecondPlayerFailed(JSON.stringify(serializeError(error))));
    }
  };
}
