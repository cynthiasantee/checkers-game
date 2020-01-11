import { BoardSquare } from '../State/slices'
import { isDiagonalByOneOrTwo } from '../util/movePieceRules'
import { removePiece } from '../util/removePiece'
export type Location = [number, number];

export const movePiece = ([currI, currJ]: Location, [destI, destJ]: Location, board: BoardSquare[][]) => {
    const currentLocation = board[currI][currJ];
    const moveTo = board[destI][destJ];
   
    if (isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === 'byTwo') {
        if ( [destI, destJ] === [currI-2, currJ-2]) {
            removePiece([-1, -1], board)
            moveTo.piece = currentLocation.piece
            currentLocation.piece = null
        } else if ( [destI, destJ] === [currI-2, currJ+2]) {
            removePiece([-1, +1], board)
            moveTo.piece = currentLocation.piece
            currentLocation.piece = null
        } else if ( [destI, destJ] === [currI+2, currJ-2]) {
            removePiece([+1, -1], board)
            moveTo.piece = currentLocation.piece
            currentLocation.piece = null
        } else if ( [destI, destJ] === [currI+2, currJ+2]) {
            removePiece([+1, +1], board)
            moveTo.piece = currentLocation.piece
            currentLocation.piece = null
        }

    } else if (isDiagonalByOneOrTwo([currI, currJ], [destI, destJ], board) === 'byOne') {
        moveTo.piece = currentLocation.piece
        currentLocation.piece = null
    }
}



//[currI, currJ]: Location, [destI, destJ]: Location


// export const movePiece = (curr: Location, to: Location, board: BoardSquare[][]) => {
//     if (isDiagonalByOneOrTwo(curr, to, board) === 'byTwo') {
//         const currentLocation = board[curr[0]][curr[1]];
//         const moveTo = board[to[0]][to[1]]
        
//         if (moveTo === currentLocation)

//         moveTo.piece = currentLocation.piece
//         currentLocation.piece = null
//     }

// }