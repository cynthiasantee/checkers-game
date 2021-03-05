import { removePiece } from "../util/removePiece";
import { INITIAL_BOARD } from "../util/initialBoard";

describe("removePiece function", () => {
  it("should remove piece", () => {
    removePiece([5, 0], INITIAL_BOARD);
    expect(INITIAL_BOARD[5][0].piece).toStrictEqual(null);
  });
});
