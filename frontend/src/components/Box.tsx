import React from 'react';
import styled from 'styled-components/macro';

interface OwnProps {
    children: string
}

const Box: React.FC<OwnProps> = (props) => {


    return (
        <Container>
            <p>{props.children}</p>
        </Container>
    )
}

const Container = styled.div`
    height: 50px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 30px;

    p{
        margin: 16px;

    }
`

export default Box;