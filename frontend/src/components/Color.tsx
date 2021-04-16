import React from 'react';
import styled from 'styled-components/macro';
import { Color as ColorType } from '../redux/api/addMoveApi';

interface OwnProps {
    color: string;
}

const Color = (props: OwnProps) => {
    
    return (
        <Container color={props.color} />
    )
};

const Container = styled.span<{color: string}>`
    border: 1px solid black;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: ${((props) => props.color)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
`


export default Color;