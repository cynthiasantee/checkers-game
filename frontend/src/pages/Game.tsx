import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Square from '../components/Square';
import Piece from '../components/Piece';
import Double from '../components/Double';
import { Player } from '../redux/api/getPlayerApi';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { AppDispatch, RootState } from '../redux/store';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
import { fetchPlayer } from "../redux/thunk/getPlayerThunk";
import { SelectGame } from '../redux/selector/getGameSelector';
import { fetchGame } from "../redux/thunk/getGameThunk";
import { fetchCurrBoard } from "../redux/thunk/getCurrBoardThunk";
import { connect } from 'react-redux';
import page from '../pages/page';
import { useParams } from "react-router-dom";
import { BoardSquare } from '../redux/api/addMoveApi';
import { SelectCurrBoard  } from '../redux/selector/getCurrBoardSelector';
import { Game as GameInterface } from '../redux/api/getGameApi';
import { SelectAddMove } from '../redux/selector/addMoveSelector';
import {addMoveReset} from "../redux/reducer/addMoveReducer"

//Turn
import { SelectChangeTurn } from '../redux/selector/changeTurnSelector';
import {changeTurn } from "../redux/thunk/changeTurnThunk";
import { OtherPlayerId, Turn } from '../redux/api/changeTurnApi';

//Set colors
import { SelectSetColors } from '../redux/selector/setColorsSelector';
import { setColors } from "../redux/thunk/setColorsThunk";
import { SetColor } from '../redux/api/setColorsApi';
// import myId from '../redux/reducer/myId';

interface StateProps {
  myId: number | null;

  //player info
  player?: Player;
  playerError?: MyKnownError;
  playerFetchStatus: FetchStatus;

  // game info
  game?: GameInterface;
  gameError?: MyKnownError;
  gameFetchStatus: FetchStatus;

  //get board
  currBoard?: BoardSquare[][];
  currBoardError?: MyKnownError;
  currBoardFetchStatus: FetchStatus;

  //turn
  turn?: Turn;
  turnError?: MyKnownError;
  turnFetchStatus: FetchStatus;

  // set colors
  setColors?: string;
  setColorsError?: MyKnownError;
  setColorsFetchStatus: FetchStatus;
  

  // move fetch
  moveFetchStatus: FetchStatus;
}

interface DispatchProps {
  getPlayer: (id: number) => void;
  getGame: (id: number) => void;
  getCurrBoard: (id: number) => void;
  moveReset: () => void;
  changeTurn: (other_player_id: OtherPlayerId, game_id: number) => void;
  setColors: (colorInfo: SetColor, game_id: number) => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getGame, getPlayer, getCurrBoard, game, player } = props;

    useEffect(() => {
      getGame(parseInt(id));
      getPlayer(props.myId || 0);
      getCurrBoard(parseInt(id))
    
  }, [id, getGame, getPlayer, getCurrBoard, props.turn]);

  if ( !game || !player || !props.currBoard){
    return <></>;
  }

  // const myId = game.player_one_id === player.id ? game.player_one_id : game.player_two_id;
  const otherPlayerId = game.player_one_id === props.myId ? game.player_two_id : game.player_one_id;

  return (
    <div>
      <p>Player one ID: {game.player_one_id}</p>
      <p>Player one username: {game.player_one_username}</p>
      <p>-------------------------</p>
      <p>Player two ID: {game.player_two_id}</p>
      <p>Player two username: {game.player_two_username}</p>
      <p>Player turn: {game.turn}</p>

      {otherPlayerId && <button disabled={game.turn !== props.myId} onClick={() => props.changeTurn({other_player_id: otherPlayerId}, parseInt(id))}>Change Turn</button>}
      
    <Container>
      {props.currBoard.map(row => row.map(square => {
        if (square.squareColor === 'black') {
          if (square.piece === null) {
            return <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true}></Square>
          } else if (square.piece.color === 'white' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === false) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'white' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true}>
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="white"></Double>
              </Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === true) {
            return(
            <Square color="black" location={square.location} hasPiece={square.piece === null ? false : true}>
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble} squareLocation={square.location}>
                <Double color="black"></Double>
              </Piece>
            </Square>
            )
          }
        } else if (square.squareColor === 'white') {
          return <Square color="white" location={square.location} hasPiece={square.piece === null ? false : true}></Square>
        }
      }))}
    </Container>
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  myId: state.myId,

  player: SelectPlayer.data(state),
  playerError: SelectPlayer.error(state),
  playerFetchStatus: SelectPlayer.status(state),

  game: SelectGame.data(state),
  gameError: SelectGame.error(state),
  gameFetchStatus: SelectGame.status(state),

  currBoard: SelectCurrBoard.data(state),
  currBoardError: SelectCurrBoard.error(state),
  currBoardFetchStatus: SelectCurrBoard.status(state),

  turn: SelectChangeTurn.data(state),
  turnError: SelectChangeTurn.error(state),
  turnFetchStatus: SelectChangeTurn.status(state),

  setColors: SelectSetColors.data(state),
  setColorsError: SelectSetColors.error(state),
  setColorsFetchStatus: SelectSetColors.status(state),

  moveFetchStatus: SelectAddMove.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  getGame: (id) => dispatch(fetchGame(id)),
  getCurrBoard: (id) => dispatch(fetchCurrBoard(id)),
  moveReset: () => dispatch(addMoveReset()),
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