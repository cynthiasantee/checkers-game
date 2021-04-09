import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Color } from '../redux/api/addMoveApi';
import { AppDispatch, RootState } from '../redux/store';
import { Location } from '../util/move';
import {selectPiece} from "../redux/reducer/selectPiece"
import { Player } from '../redux/api/getPlayerApi';
import { Game } from '../redux/api/getGameApi';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
import { SelectGame } from '../redux/selector/getGameSelector';

interface OwnProps {
    color: Color;
    id: number;
    isDouble: boolean;
    squareLocation: Location;
    children?: any;
}

interface StateProps {
    selectedPiece: Location| null;
    player?: Player;
    game?: Game;
}

interface DispatchProps {
    selectPiece: (location: Location) => void;
}


const Piece: React.FC<OwnProps & StateProps & DispatchProps> = (props) => {
    const {player, game} = props;
    if (!player || !game) return <></>

    const myColor = player.player_id === game.player_one_id ? game.player_one_color : game.player_two_color;

    const onPieceSelect = () => {
        if (props.color === myColor && game.turn === player.player_id) {
            props.selectPiece(props.squareLocation);
        }
    }
    
    return (
        <Container color={props.color}  onClick={onPieceSelect} squareLocation={props.squareLocation} selectedPiece={props.selectedPiece}>
            {props.children}
        </Container>
    )
};

const Container = styled.div<{color: Color; squareLocation: Location; selectedPiece: Location | null}>`
    border: ${((props) => props.squareLocation === props.selectedPiece ? "3px solid yellow" : "3px solid white")};
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: ${((props) => props.color)};
    display: flex;
    align-items: center;
    justify-content: center;
`
const mapStateToProps = (state: RootState): StateProps => ({
    selectedPiece: state.selectPiece,
    player: SelectPlayer.data(state),
    game: SelectGame.data(state),
});
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    selectPiece: (location) => dispatch(selectPiece(location))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Piece);