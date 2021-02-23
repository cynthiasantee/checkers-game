import { removePiece } from "../util/removePiece";
import { initialBoard } from "../redux/reducer/board";

describe("removePiece function", () => {
  it("should remove piece", () => {
    removePiece([5, 0], initialBoard);
    expect(initialBoard[5][0].piece).toStrictEqual(null);
  });
});
