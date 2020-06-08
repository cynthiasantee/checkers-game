import React from 'react';
import styled from 'styled-components/macro';



const BlackSquare: React.FC<{}> = ({children})=> {
    return (
        <Square>
            {children}
        </Square>
    )
}

const Square = styled.div`
    height: 80px;
    width: 80px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`
//    border: 1px solid black;
export default BlackSquare;