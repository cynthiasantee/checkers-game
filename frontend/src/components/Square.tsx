import React from 'react';
import styled from 'styled-components/macro';
import { Color }  from "../util/color";

interface OwnProps {
    color: Color;
}

const Square: React.FC<OwnProps> = (props) => {
    return (
        <Container color={props.color}>
            {props.children}
        </Container>
    )
}

const Container = styled.div<{color: Color}>`
height: 80px;
width: 80px;
background-color: ${(props) => props.color};
display: flex;
align-items: center;
justify-content: center;
`


export default Square;