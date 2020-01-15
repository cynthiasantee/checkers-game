import { movePiece } from '../util/move'
import { printBoard } from '../util/printBoard'

describe('movePiece function', () => {
    beforeEach(() => {
        jest.resetModules()
      });

  it('should take piece', () => {
    // setup
    const { initialBoard } = require('../State/slices') 
    movePiece([2, 1], [3, 2], initialBoard)
    movePiece([3, 2], [4, 3], initialBoard);

    // take piece
    expect(initialBoard[3][2].piece).toStrictEqual(null);
    expect(initialBoard[4][3].piece.color).toStrictEqual('white')
    expect(initialBoard[5][4].piece.color).toEqual('black');
    movePiece([5, 4], [3, 2], initialBoard);
    expect(initialBoard[3][2].piece.color).toEqual('black');
    expect(initialBoard[4][3].piece).toStrictEqual(null)
    printBoard(initialBoard)
  });

  it('should move piece to the right location', () => {
    const { initialBoard } = require('../State/slices') 
    expect(initialBoard[2][1].piece && initialBoard[2][1].piece.id).toStrictEqual(9);
    expect(initialBoard[3][2].piece).toStrictEqual(null);
    movePiece([2, 1], [3, 2], initialBoard)
    expect(initialBoard[2][1].piece).toStrictEqual(null);
    expect(initialBoard[3][2].piece && initialBoard[3][2].piece.id).toStrictEqual(9);
    movePiece([3, 2], [4, 3], initialBoard);
    movePiece([5, 4], [3, 2], initialBoard);
    expect(initialBoard[4][3].piece).toStrictEqual(null)
  })
})