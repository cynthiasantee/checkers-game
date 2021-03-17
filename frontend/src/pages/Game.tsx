import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import page from '../pages/page';
import { useParams } from "react-router-dom";
//Redux
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
//Player
import { Player } from '../redux/api/getPlayerApi';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
//Game
import { SelectGame } from '../redux/selector/getGameSelector';
import { fetchGame } from "../redux/thunk/getGameThunk";
import { Game as GameInterface } from '../redux/api/getGameApi';
//Board
import { fetchCurrBoard } from "../redux/thunk/getCurrBoardThunk";
import { SelectCurrBoard  } from '../redux/selector/getCurrBoardSelector';
import { BoardSquare } from '../redux/api/addMoveApi';
//Board components
import Square from '../components/Square';
import Piece from '../components/Piece';
import Double from '../components/Double';
//Turn
import { SelectChangeTurn } from '../redux/selector/changeTurnSelector';
import {changeTurn } from "../redux/thunk/changeTurnThunk";
import { OtherPlayerId, Turn } from '../redux/api/changeTurnApi';
//Set colors
import { setColors } from "../redux/thunk/setColorsThunk";
import { SetColor } from '../redux/api/setColorsApi';

interface StateProps {
  player?: Player;
  game?: GameInterface;
  currBoard?: BoardSquare[][];
  turn?: Turn;
}

interface DispatchProps {
  getGame: (id: number) => void;
  getCurrBoard: (id: number) => void;
  changeTurn: (other_player_id: OtherPlayerId, game_id: number) => void;
  setColors: (colorInfo: SetColor, game_id: number) => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getGame, getCurrBoard, game, player } = props;

    useEffect(() => {
      getGame(parseInt(id));
      getCurrBoard(parseInt(id))
    
    }, [id, getGame, getCurrBoard, props.turn]);

  if ( !game || !player || !props.currBoard){
    return <></>;
  }

  const otherPlayerId = game.player_one_id === player.player_id ? game.player_two_id : game.player_one_id;

  return (
    <div>
      <p>Player one ID: {game.player_one_id}</p>
      <p>Player one username: {game.player_one_username}</p>
      <p>Player one color: {game.player_one_color}</p>
      <p>-------------------------</p>
      <p>Player two ID: {game.player_two_id}</p>
      <p>Player two username: {game.player_two_username}</p>
      <p>Player two color: {game.player_two_color}</p>
      <p>-------------------------</p>
      <p>Player turn: {game.turn}</p>

      {otherPlayerId && <button disabled={game.turn !== player.player_id} onClick={() => props.changeTurn({other_player_id: otherPlayerId}, parseInt(id))}>Change Turn</button>}

      <p>Pick your color:</p>
      {otherPlayerId && <button disabled={game.player_one_color !== null} onClick={() => props.setColors({ player_one_id: game.player_one_id, player_id: player.player_id || 0, color: "black"}, parseInt(id))}>Black</button>}
      {otherPlayerId && <button disabled={game.player_one_color !== null} onClick={() => props.setColors({ player_one_id: game.player_one_id, player_id: player.player_id || 0, color: "white"}, parseInt(id))}>White</button>}
      
    <Container>
      {props.currBoard.map(row => row.map(square => {
        if (square.squareColor === 'black') {
          if (square.piece === null) {
            return <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}></Square>
          } else if (square.piece.color === 'white' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'white' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="white"></Double>
              </Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="black"></Double>
              </Piece>
            </Square>
            )
          }
        } else if (square.squareColor === 'white') {
          return <Square color="white" location={square.location} hasPiece={square.piece === null ? false : true} key={square.location.toString()}></Square>
        }
      }))}
    </Container>
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  player: SelectPlayer.data(state),
  game: SelectGame.data(state),
  currBoard: SelectCurrBoard.data(state),
  turn: SelectChangeTurn.data(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getGame: (id) => dispatch(fetchGame(id)),
  getCurrBoard: (id) => dispatch(fetchCurrBoard(id)),
  changeTurn: (other_player_id, game_id) => dispatch(changeTurn(other_player_id, game_id)),
  setColors: (colorInfo, game_id) => dispatch(setColors(colorInfo, game_id))

});
export default page("game")(connect(mapStateToProps, mapDispatchToProps)(Game));

const Container = styled.div`
  height: 640px;
  width: 640px;
  display: flex;
  flex: direction: row;
  flex-wrap: wrap;
  border: 1px solid black
`