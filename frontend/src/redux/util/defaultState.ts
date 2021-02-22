import { FetchedState } from "./fetchedState";

export function defaultState<T>(): FetchedState<T> {
  return {
    fetchStatus: "notStarted",
    error: undefined,
    data: undefined,
  };
}
