import { board } from '../State/slices'

describe('board reducer', () => {
  it('should move the piece', () => {
        const newBoard = board.reducer(
            undefined, 
            board.actions.movePiece({ pieceId: 9,location: [3, 2]})
        );
        expect(newBoard[2][1].piece).toEqual(null);
        expect(newBoard[3][2].piece && newBoard[3][2].piece.id).toEqual(9);

        const newerBoard = board.reducer(
            newBoard, 
            board.actions.movePiece({ pieceId: 9,location: [5, 3]})
        );
        expect(newerBoard[3][2].piece).toEqual(null);
        expect(newerBoard[5][3].piece && newerBoard[5][3].piece.id).toEqual(9);
  })
})