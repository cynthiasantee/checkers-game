import React from 'react';
import styled from 'styled-components'

const WhitePiece: React.FC<{}> = ({children}) => {
    return (
        <Piece>
            {children}
        </Piece>
    )
}

const Piece = styled.div`
    border: 1px solid black;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default WhitePiece;