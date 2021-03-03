export const removePiece = (piece, board) => {
  const toRemove = board[piece[0]][piece[1]];
  toRemove.piece = null;
};
