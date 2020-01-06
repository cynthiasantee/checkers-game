import { BoardSquare } from '../State/slices'

export type Location = [number, number];

export const movePiece = (curr: Location, to: Location, board: BoardSquare[][]) => {
    const currentLocation = board[curr[0]][curr[1]];
    const moveTo = board[to[0]][to[1]]

    moveTo.piece = currentLocation.piece
    currentLocation.piece = null
}
