import React from 'react';
import styled from 'styled-components'

const WhiteSquare = () => {
    return (
        <Square>

        </Square>
    )
}

const Square = styled.div`
    border: 1px solid black;
    height: 80px;
    width: 80px;
    background-color: white;
`

export default WhiteSquare;