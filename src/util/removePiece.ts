import { BoardSquare } from '../State/slices'
import { Location } from '../util/move' 

export const removePiece = (piece: Location, board: BoardSquare[][]) => {
    const toRemove = board[piece[0]][piece[1]];
    toRemove.piece = null
}
