import { Location } from './move'

export const compArr = (arrOve: Location, arrTwo: Location): boolean => {
    return JSON.stringify(arrOve) === JSON.stringify(arrTwo)
}