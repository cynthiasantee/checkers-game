import {
  isDiagonalByOneOrTwo,
  isEmpty,
  isOnBoard,
} from "../util/movePieceRules";
import { initialBoard } from "../redux/reducer/board";

describe("isOnBoard function", () => {
  it("should check if move is within the board", () => {
    expect(isOnBoard([0, 1])).toEqual(true);
    expect(isOnBoard([0, 3])).toEqual(true);
    expect(isOnBoard([0, 5])).toEqual(true);
    expect(isOnBoard([0, 7])).toEqual(true);
    expect(isOnBoard([1, 0])).toEqual(true);
    expect(isOnBoard([1, 2])).toEqual(true);
    expect(isOnBoard([1, 4])).toEqual(true);
    expect(isOnBoard([1, 6])).toEqual(true);
    expect(isOnBoard([2, 1])).toEqual(true);
    expect(isOnBoard([2, 3])).toEqual(true);
    expect(isOnBoard([2, 5])).toEqual(true);
    expect(isOnBoard([2, 7])).toEqual(true);
    expect(isOnBoard([5, 0])).toEqual(true);
    expect(isOnBoard([5, 2])).toEqual(true);
    expect(isOnBoard([5, 4])).toEqual(true);
    expect(isOnBoard([5, 6])).toEqual(true);
    expect(isOnBoard([6, 1])).toEqual(true);
    expect(isOnBoard([6, 3])).toEqual(true);
    expect(isOnBoard([6, 5])).toEqual(true);
    expect(isOnBoard([6, 7])).toEqual(true);
    expect(isOnBoard([7, 0])).toEqual(true);
    expect(isOnBoard([7, 2])).toEqual(true);
    expect(isOnBoard([7, 4])).toEqual(true);
    expect(isOnBoard([7, 6])).toEqual(true);

    expect(isOnBoard([3, 0])).toEqual(true);
    expect(isOnBoard([3, 2])).toEqual(true);
    expect(isOnBoard([3, 4])).toEqual(true);
    expect(isOnBoard([3, 6])).toEqual(true);
    expect(isOnBoard([4, 1])).toEqual(true);
    expect(isOnBoard([4, 3])).toEqual(true);
    expect(isOnBoard([4, 5])).toEqual(true);
    expect(isOnBoard([4, 7])).toEqual(true);

    expect(isOnBoard([1, -2])).toEqual(false);
    expect(isOnBoard([6, -1])).toEqual(false);
    expect(isOnBoard([9, 0])).toEqual(false);
    expect(isOnBoard([8, 5])).toEqual(false);
    expect(isOnBoard([7, 8])).toEqual(false);
    expect(isOnBoard([4, 9])).toEqual(false);
    expect(isOnBoard([-2, 2])).toEqual(false);
    expect(isOnBoard([-1, 7])).toEqual(false);
  });
});

describe("isEmpty function", () => {
  it("should check if location is empty", () => {
    expect(isEmpty([3, 0], initialBoard)).toEqual(true);
    expect(isEmpty([3, 2], initialBoard)).toEqual(true);
    expect(isEmpty([3, 4], initialBoard)).toEqual(true);
    expect(isEmpty([3, 6], initialBoard)).toEqual(true);
    expect(isEmpty([4, 1], initialBoard)).toEqual(true);
    expect(isEmpty([4, 3], initialBoard)).toEqual(true);
    expect(isEmpty([4, 5], initialBoard)).toEqual(true);
    expect(isEmpty([4, 7], initialBoard)).toEqual(true);
    expect(isEmpty([0, 1], initialBoard)).toEqual(false);
    expect(isEmpty([1, 2], initialBoard)).toEqual(false);
    expect(isEmpty([2, 3], initialBoard)).toEqual(false);
    expect(isEmpty([5, 6], initialBoard)).toEqual(false);
    expect(isEmpty([6, 7], initialBoard)).toEqual(false);
    expect(isEmpty([7, 4], initialBoard)).toEqual(false);
  });
});

describe("isDiagonalByOneOrTwo function", () => {
  it("should check if move is diagonal", () => {
    expect(isDiagonalByOneOrTwo([1, 2], [3, 0], initialBoard)).toEqual("byTwo");
    expect(isDiagonalByOneOrTwo([5, 0], [4, 1], initialBoard)).toEqual("byOne");
    expect(isDiagonalByOneOrTwo([5, 2], [4, 2], initialBoard)).toEqual(
      "invalidMove"
    );
  });
});
