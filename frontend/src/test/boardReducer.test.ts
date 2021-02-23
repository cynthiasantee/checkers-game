import { board } from "../redux/reducer/board";
import { printBoard } from "../util/printBoard";

describe("board reducer", () => {
  it("should move the piece", () => {
    const newBoard = board.reducer(
      undefined, // the first time the reducer is called, it is unndefined
      board.actions.movePiece({ pieceId: 9, location: [3, 2] })
    );
    expect(newBoard[2][1].piece).toEqual(null);
    expect(newBoard[3][2].piece && newBoard[3][2].piece.id).toEqual(9);

    // printBoard(newBoard)

    const newerBoard = board.reducer(
      newBoard,
      board.actions.movePiece({ pieceId: 9, location: [4, 3] })
    );
    // printBoard(newerBoard)
    expect(newerBoard[3][2].piece).toEqual(null);
    expect(newerBoard[4][3].piece && newerBoard[4][3].piece.id).toEqual(9);
  });
});
