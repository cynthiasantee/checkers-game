import React from 'react';
import styled from 'styled-components'

const WhitePiece = () => {
    return (
        <Piece>

        </Piece>
    )
}

const Piece = styled.div`
    border: 1px solid black;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: white;
`

export default WhitePiece;