import { BoardSquare } from '../State/slices'
import { isDiagonalByOneOrTwo } from '../util/movePieceRules'
import { removePiece } from '../util/removePiece'
import { compArr } from './compArr'
import { getValidMoves } from '../util/getValidMoves'
export type Location = [number, number];

export const movePiece = ([currI, currJ]: Location, [destI, destJ]: Location, board: BoardSquare[][]) => {
    const currentLocation = board[currI][currJ];
    const moveTo = board[destI][destJ];
    const destPieces: Location[] = [[currI - 2, currJ - 2], [currI - 2, currJ + 2], [currI + 2, currJ - 2], [currI + 2, currJ + 2]];
    const pieceToRemove: Location[] = [[currI - 1, currJ - 1], [currI - 1, currJ + 1], [currI + 1, currJ - 1], [currI + 1, currJ + 1]];

    const move = () => {
        moveTo.piece = currentLocation.piece
        currentLocation.piece = null
    }

    if (getValidMoves([currI, currJ], board).some(location => JSON.stringify(location) === JSON.stringify([destI, destJ]))) {

        if (isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === 'byTwo') {
            destPieces.forEach((piece, i) => {
                if (compArr([destI, destJ], [piece[0], piece[1]])) {
                    move()
                    removePiece(pieceToRemove[i], board)
                }
            })
        } else if (isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === 'byOne') {
            move()
        }
    }
}