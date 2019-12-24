import { movePiece } from '../util/movePiece'
import { initialBoard } from '../State/slices'

describe('movePiece function', () => {
  it('should move piece to the right location', () => {
    expect(initialBoard[2][1].piece && initialBoard[2][1].piece.id).toStrictEqual(9);
    expect(initialBoard[3][2].piece).toStrictEqual(null);
    movePiece([2, 1], [3, 2], initialBoard)
    expect(initialBoard[2][1].piece).toStrictEqual(null);
    expect(initialBoard[3][2].piece && initialBoard[3][2].piece.id).toStrictEqual(9);
  })
})