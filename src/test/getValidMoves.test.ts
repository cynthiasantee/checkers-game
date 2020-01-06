import { initialBoard } from '../State/slices'
import { getValidMoves } from '../util/getValidMoves'

describe('getValidMoves function', () => {
    it('should return an array of valid moves', () => {
      expect(getValidMoves([5, 4], initialBoard)).toStrictEqual([[4,3], [4, 5]]);
    })
})