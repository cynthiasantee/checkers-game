import { CreateGameApi } from "../api/createGameApi";
import {
  createGameFailed,
  createGameLoading,
  createGameSuccess,
} from "../reducer/createGameReducer";
import { CGThunkAction } from "./cgThunkAction";

export function createGame(id: number): CGThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(createGameLoading());
      const { data } = await CreateGameApi.createGame({ player_one_id: id });
      dispatch(createGameSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(createGameFailed(error));
    }
  };
}
