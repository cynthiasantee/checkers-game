import { toDouble } from '../util/toDouble'
import { movePiece } from '../util/movePiece'
import { initialBoard } from '../State/slices'

describe('toDouble function', () => {
  it('should make the right piece double', () => {
    movePiece([2, 5], [3, 4], initialBoard);
    movePiece([3, 4], [4, 3], initialBoard);
    movePiece([1, 6], [2, 5], initialBoard);
    movePiece([2, 5], [3, 4], initialBoard);
    movePiece([0, 7], [1, 6], initialBoard);
    movePiece([1, 6], [2, 5], initialBoard);
    movePiece([2, 7], [3, 6], initialBoard);
    movePiece([3, 6], [4, 5], initialBoard);
    movePiece([5, 6], [4, 7], initialBoard);
    movePiece([4, 7], [3, 6], initialBoard);
    movePiece([3, 6], [2, 7], initialBoard);
    movePiece([2, 7], [1, 6], initialBoard);
    movePiece([1, 6], [0, 7], initialBoard);
    expect(initialBoard[0][7].piece?.isDouble).toBeFalsy()
    toDouble(initialBoard)
    expect(initialBoard[0][7].piece?.isDouble).toBeTruthy()

  })
})