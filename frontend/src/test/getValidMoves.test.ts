import { getValidMoves } from '../util/getValidMoves'
import { movePiece } from '../util/move'
import { printBoard } from '../util/printBoard';

describe('getValidMoves function', () => {
  beforeEach(() => {
    jest.resetModules()
  });

    it('should return 2 take moves', () => {
      const { initialBoard } = require('../State/slices') 
      expect(getValidMoves([5, 4], initialBoard)).toStrictEqual([[4,3], [4, 5]]);
    });

    it('should return 1 take and 1 move', () => {
      const { initialBoard } = require('../State/slices')
      movePiece([2, 3], [3, 4], initialBoard);
      movePiece([3, 4], [4, 5], initialBoard);
      expect(getValidMoves([5, 4], initialBoard)).toStrictEqual([[4, 3], [3, 6]]);
    });

    it('should return 0 takes and 1 move', () => {
      const { initialBoard } = require('../State/slices')
      expect(getValidMoves([5, 0], initialBoard)).toStrictEqual([[4, 1]]);
    });

    it('should return 1 take and 0 move', () => {
      const { initialBoard } = require('../State/slices')
      movePiece([5, 6], [4, 7], initialBoard);
      movePiece([4, 7], [3, 6], initialBoard);
      expect(getValidMoves([2, 7], initialBoard)).toStrictEqual([[4, 5]]);
    });

    it('should return 0 moves', () => {
      const { initialBoard } = require('../State/slices')
      expect(getValidMoves([6, 1], initialBoard)).toStrictEqual([]);
    });

    it('should work for edge of board', () => {
      const { initialBoard } = require('../State/slices');
      initialBoard[1][6].piece = {color: 'black', isDouble: false, id: 5};
      initialBoard[0][7].piece = null;
      printBoard(initialBoard);
      expect(getValidMoves([1, 6], initialBoard)).toStrictEqual([[0, 7]])
    })
})