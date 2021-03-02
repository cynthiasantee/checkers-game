import React from 'react';
import styled from 'styled-components/macro';
import { Color } from '../util/color';

interface OwnProps {
    color: Color;
}

const Piece: React.FC<OwnProps> = (props) => {
    return (
        <Container color={props.color}>
            {props.children}
        </Container>
    )
}

//onClick={() => {console.log(initialBoard[0][1].piece?.id)}}

const Container = styled.div<{color: Color}>`
    border: 1px solid white;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: ${((props) => props.color)};
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Piece;