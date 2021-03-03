export const findPiece = (pieceID, board) => {
  let location = [-1, -1];
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square.piece && square.piece.id === pieceID) {
        location = [i, j];
      }
    });
  });
  return location;
};
