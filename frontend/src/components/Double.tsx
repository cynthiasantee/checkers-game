import React from 'react';
import styled from 'styled-components/macro';
import { Color } from '../util/color';

interface OwnProps {
    color: Color;
}

const Double = (props: OwnProps) => {
    return <Container color={props.color} />
}

const Container = styled.div<{color: Color}>`
    border: 1px solid ${((props) => props.color === "black" ? "white" : "black")};
    background-color: ${((props) => props.color)};
    border-radius: 50%;
    height: 30px;
    width: 30px;
`

export default Double;