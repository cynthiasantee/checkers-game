export const toDouble = (board) => {
  const doubleBlackSpaces = [
    [0, 1],
    [0, 3],
    [0, 5],
    [0, 7],
  ];
  const doubleWhiteSpaces = [
    [7, 0],
    [7, 2],
    [7, 4],
    [7, 6],
  ];

  const toDoubleIfValid = (color) => (location) => {
    const [x, y] = location;
    const boardPiece = board[x][y].piece;
    if (boardPiece && boardPiece.color === color) {
      boardPiece.isDouble = true;
    }
  };

  doubleBlackSpaces.forEach(toDoubleIfValid("black"));
  doubleWhiteSpaces.forEach(toDoubleIfValid("white"));
};
