import { BoardSquare } from '../State/slices'

export const toDouble = (board: BoardSquare[][]) => {
    if (board[0][1].piece?.color === 'black') {
        board[0][1].piece.isDouble = true;
    }

    if (board[0][3].piece?.color === 'black') {
        board[0][3].piece.isDouble = true;
    }

    if (board[0][5].piece?.color === 'black') {
        board[0][5].piece.isDouble = true;
    }

    if (board[0][7].piece?.color === 'black') {
        board[0][7].piece.isDouble = true;
    }

    if (board[7][0].piece?.color === 'white') {
        board[7][0].piece.isDouble = true;
    }

    if (board[7][2].piece?.color === 'white') {
        board[7][2].piece.isDouble = true;
    }

    if (board[7][4].piece?.color === 'white') {
        board[7][4].piece.isDouble = true;
    }

    if (board[7][6].piece?.color === 'white') {
        board[7][6].piece.isDouble = true;
    }
}