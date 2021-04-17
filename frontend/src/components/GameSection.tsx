import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import { Game } from '../redux/api/getGameApi';
import { homeButtonStyle } from "../styles/homeButtonStyle"

interface Props {
    title: string;
    games: Game[];
    gameButton: (game: Game) => ReactElement; 
}

export const GameSection = (props: Props) => {
    return (
        <Container>
            <h1>{props.title}</h1>
            {props.games.map(props.gameButton)}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    flex-direction: column;
    flex: 1;
    

    button {
        ${homeButtonStyle};
    }
`;
