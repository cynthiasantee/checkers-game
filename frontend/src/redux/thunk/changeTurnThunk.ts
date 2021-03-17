import { serializeError } from "serialize-error";
import { ChangeTurnApi, OtherPlayerId } from "../api/changeTurnApi";
import {
  changeTurnFailed,
  changeTurnLoading,
  changeTurnSuccess,
} from "../reducer/changeTurnReducer";
import { CGThunkAction } from "./cgThunkAction";

export function changeTurn(
  other_player_id: OtherPlayerId,
  game_id: number
): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(changeTurnLoading());
      const { data } = await ChangeTurnApi.changeTurn(
        {
          other_player_id: other_player_id.other_player_id,
        },
        game_id
      );
      dispatch(changeTurnSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(changeTurnFailed(JSON.stringify(serializeError(error))));
    }
  };
}
