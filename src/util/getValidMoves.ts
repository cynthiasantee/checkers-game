import { BoardSquare } from '../State/slices'
import { Location } from '../util/movePiece'
import { isOnBoard } from './movePieceRules' 

export const getValidMoves = (curr: Location, board: BoardSquare[][]): Location[] => {
    const [i, j] = curr;
    const pieceColor = board[i][j].piece.color;
    const validMoves = []

    const whiteFL = [i+1,j-1]
    const whiteTL = [i+2,j-2]
    const whiteFR = [i+1,j+1]
    const whiteTR = [i+2,j+2]
    const blackFL = [i-1,j-1]
    const blackTL = [i-2,j-2]
    const blackFR = [i-1,j+1]
    const blackTR = [i-2,j+2]
    
    if (pieceColor === 'white') {
        if (board[whiteFL[0]][whiteFL[1]].piece === null) {
            validMoves.push(whiteFL);
        } else if (board[whiteTL[0]][whiteTL[1]].piece === null && board[whiteFL[0]][whiteFL[1]].piece.color === 'black') {
            validMoves.push(whiteTL)
        }

        if (board[whiteFR[0]][whiteFR[1]].piece === null) {
            validMoves.push(whiteFR);
        } else if (board[whiteTR[0]][whiteTR[1]].piece === null && board[whiteFR[0]][whiteFR[1]].piece.color === 'black') {
            validMoves.push(whiteTR)
        }
    } else if (pieceColor === 'black') {
        if (board[blackFL[0]][blackFL[1]].piece === null) {
            validMoves.push(blackFL);
        } else if (board[blackTL[0]][blackTL[1]].piece === null && board[blackFL[0]][blackFL[1]].piece.color === 'white') {
            validMoves.push(blackTL)
        }

        if (board[blackFR[0]][blackFR[1]].piece === null) {
            validMoves.push(blackFR);
        } else if (board[blackTR[0]][blackTR[1]].piece === null && board[blackFR[0]][blackFR[1]].piece.color === 'white') {
            validMoves.push(blackTR)
        }
    }

    return validMoves.filter(isOnBoard)
}

