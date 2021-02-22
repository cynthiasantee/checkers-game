import { Player } from "../api/playerApi";
import {
  getTrainingFailed,
  getTrainingLoading,
  getTrainingSuccess,
} from "../reducer/trainingReducer";
import { CHThunkAction } from "./chThunkAction";

export function fetchTraining(): CHThunkAction<void> {
  return async (dispatch) => {
    try {
      dispatch(getTrainingLoading());
      const { data } = await TrainingApi.fetchTraining();
      dispatch(getTrainingSuccess(data));
    } catch (err) {
      const error = err?.response?.status === 400 ? "400" : err;
      dispatch(getTrainingFailed(error));
    }
  };
}
