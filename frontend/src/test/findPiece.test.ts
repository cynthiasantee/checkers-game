import { findPiece } from "../util/findPiece";
import { initialBoard } from "../redux/reducer/selectPiece";

describe("findPiece function", () => {
  it("should find the right piece", () => {
    expect(findPiece(1, initialBoard)).toStrictEqual([0, 1]);
    expect(findPiece(2, initialBoard)).toStrictEqual([0, 3]);
    expect(findPiece(3, initialBoard)).toStrictEqual([0, 5]);
    expect(findPiece(4, initialBoard)).toStrictEqual([0, 7]);
    expect(findPiece(5, initialBoard)).toStrictEqual([1, 0]);
    expect(findPiece(6, initialBoard)).toStrictEqual([1, 2]);
    expect(findPiece(7, initialBoard)).toStrictEqual([1, 4]);
    expect(findPiece(8, initialBoard)).toStrictEqual([1, 6]);
    expect(findPiece(9, initialBoard)).toStrictEqual([2, 1]);
    expect(findPiece(10, initialBoard)).toStrictEqual([2, 3]);
    expect(findPiece(11, initialBoard)).toStrictEqual([2, 5]);
    expect(findPiece(12, initialBoard)).toStrictEqual([2, 7]);
    expect(findPiece(13, initialBoard)).toStrictEqual([5, 0]);
    expect(findPiece(14, initialBoard)).toStrictEqual([5, 2]);
    expect(findPiece(15, initialBoard)).toStrictEqual([5, 4]);
    expect(findPiece(16, initialBoard)).toStrictEqual([5, 6]);
    expect(findPiece(17, initialBoard)).toStrictEqual([6, 1]);
    expect(findPiece(18, initialBoard)).toStrictEqual([6, 3]);
    expect(findPiece(19, initialBoard)).toStrictEqual([6, 5]);
    expect(findPiece(20, initialBoard)).toStrictEqual([6, 7]);
    expect(findPiece(21, initialBoard)).toStrictEqual([7, 0]);
    expect(findPiece(22, initialBoard)).toStrictEqual([7, 2]);
    expect(findPiece(23, initialBoard)).toStrictEqual([7, 4]);
    expect(findPiece(24, initialBoard)).toStrictEqual([7, 6]);
  });
});
