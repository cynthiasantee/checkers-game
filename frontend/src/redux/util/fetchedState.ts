import { FetchStatus } from "./fetchStatus";
import { MyKnownError } from "./myKnownError";

export interface FetchedState<Data> {
  fetchStatus: FetchStatus;
  error?: MyKnownError;
  data?: Data;
}
