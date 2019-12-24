import { BoardSquare } from '../State/slices'

export const findPiece = (pieceID:number, board: BoardSquare[][]) => {
    let location: number[] = []
    board.forEach((row ,i) => {
        row.forEach((square, j) => {
           if (square.piece && square.piece.id === pieceID) {
            location.push(i, j)
           }
        })
    })
    return [location[0], location[1]]
};