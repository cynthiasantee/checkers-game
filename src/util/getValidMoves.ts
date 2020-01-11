import { BoardSquare } from '../State/slices'
import { Location } from '../util/movePiece'
import { isOnBoard } from './movePieceRules' 

export const getValidMoves = (curr: Location, board: BoardSquare[][]): Location[] => {
    const [i, j] = curr;
    const piece = board[i][j].piece;
    const validMoves: Location[] = []

    const whiteFL: Location = [i+1,j-1]
    const whiteTL: Location = [i+2,j-2]
    const whiteFR: Location = [i+1,j+1]
    const whiteTR: Location = [i+2,j+2]
    const blackFL: Location = [i-1,j-1]
    const blackTL: Location = [i-2,j-2]
    const blackFR: Location = [i-1,j+1]
    const blackTR: Location = [i-2,j+2]
    
    if (piece?.isDouble === false) {
        const pieceColor = piece.color
        
        if (pieceColor === 'white') {
            if (board[whiteFL[0]][whiteFL[1]]?.piece === null) {
                validMoves.push(whiteFL);
            } else if (board[whiteTL[0]][whiteTL[1]]?.piece === null && board[whiteFL[0]][whiteFL[1]].piece?.color === 'black') {
                validMoves.push(whiteTL)
            }
    
            if (board[whiteFR[0]][whiteFR[1]]?.piece === null) {
                validMoves.push(whiteFR);
            } else if (board[whiteTR[0]][whiteTR[1]]?.piece === null && board[whiteFR[0]][whiteFR[1]].piece?.color === 'black') {
                validMoves.push(whiteTR)
            }
        } else if (pieceColor === 'black') {
            if (board[blackFL[0]][blackFL[1]]?.piece === null) {
                validMoves.push(blackFL);
            } else if (board[blackTL[0]][blackTL[1]]?.piece === null && board[blackFL[0]][blackFL[1]].piece?.color === 'white') {
                validMoves.push(blackTL)
            }
    
            if (board[blackFR[0]][blackFR[1]]?.piece === null) {
                validMoves.push(blackFR);
            } else if (board[blackTR[0]][blackTR[1]]?.piece === null && board[blackFR[0]][blackFR[1]].piece?.color === 'white') {
                validMoves.push(blackTR)
            }
        }
    } else if (piece?.isDouble === true) {
        if (board[whiteFL[0]][whiteFL[1]]?.piece === null) {
            validMoves.push(whiteFL);
        } else if (board[blackTL[0]][blackTL[1]]?.piece === null && !board[blackFL[0]][blackFL[1]].piece?.color) {
            validMoves.push(blackTL)
        }

        if (board[whiteFR[0]][whiteFR[1]]?.piece === null) {
            validMoves.push(whiteFR);
        } else if (board[whiteTR[0]][whiteTR[1]]?.piece === null && !board[whiteFR[0]][whiteFR[1]].piece?.color) {
            validMoves.push(whiteTR)
        }

        if (board[blackFL[0]][blackFL[1]]?.piece === null) {
            validMoves.push(blackFL);
        } else if (board[blackTL[0]][blackTL[1]]?.piece === null && !board[blackFL[0]][blackFL[1]].piece?.color) {
            validMoves.push(blackTL)
        }

        if (board[blackFR[0]][blackFR[1]]?.piece === null) {
            validMoves.push(blackFR);
        } else if (board[blackTR[0]][blackTR[1]]?.piece === null && !board[blackFR[0]][blackFR[1]].piece?.color) {
            validMoves.push(blackTR)
        }
    }

    return validMoves.filter(isOnBoard)
}

