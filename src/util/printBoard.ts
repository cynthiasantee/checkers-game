import { BoardSquare } from '../State/slices'

export const printBoard = (board:  BoardSquare[][]) => {
    return board.forEach(row => {
        
        console.log(row.map(square => {
            if (square.piece === null) {
                return 'O';
            } else if (square.piece.color === 'black') {
                return 'B'
            } else if (square.piece.color === 'white') {
                return 'W'
            }
        }).join(''))
    })
}
