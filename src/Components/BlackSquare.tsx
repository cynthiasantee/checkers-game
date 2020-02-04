import React from 'react';
import styled from 'styled-components'



const BlackSquare: React.FC<{}> = ({children})=> {
    return (
        <Square>
            {children}
        </Square>
    )
}

const Square = styled.div`
    border: 1px solid black;
    height: 80px;
    width: 80px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default BlackSquare;