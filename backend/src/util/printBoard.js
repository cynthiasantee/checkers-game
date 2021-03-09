export const printBoard = (board) => {
  return console.log(
    board
      .map((row) => {
        return row
          .map((square) => {
            if (square.piece === null) {
              return "O";
            } else if (square.piece.color === "black") {
                if (square.piece.isDouble) {
                    return "X"
                } else {
                    return "B";
                }
            } else if (square.piece.color === "white") {
                if (square.piece.isDouble) {
                    return "Y"
                } else {
                    return "W";
                }
            } else {
                return "X"
            }
          })
          .join("");
      })
      .join("\n")
  );
};
