export const deepCopyBoard = (board) => {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
      newBoard[i] = board[i].slice();
    }
    return newBoard;
}