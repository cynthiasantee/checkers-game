import React, { Children } from 'react';
import styled from 'styled-components/macro';
import { initialBoard } from '../State/slices'

const BlackPiece: React.FC<{}> = ({children}) => {
    return (
        <Piece onClick={() => {console.log(initialBoard[0][1].piece?.id)}}>
            {children}
        </Piece>
    )
}

const Piece = styled.div`
    border: 1px solid white;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default BlackPiece;