import { Location } from "./move";

export const compArr = (arrOne: Location, arrTwo: Location): boolean => {
  return JSON.stringify(arrOne) === JSON.stringify(arrTwo);
};
