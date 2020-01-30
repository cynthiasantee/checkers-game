import React from 'react';
import styled from 'styled-components'

const BlackPiece = () => {
    return (
        <Piece>

        </Piece>
    )
}

const Piece = styled.div`
    border: 1px solid white;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: black;
`

export default BlackPiece;