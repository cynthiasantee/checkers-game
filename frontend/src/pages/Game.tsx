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

interface StateProps {
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

  // move fetch
  moveFetchStatus: FetchStatus;

}

interface DispatchProps {
  getPlayer: (id: number) => void;
  getGame: (id: number) => void;
  getCurrBoard: (id: number) => void;
  moveReset: () => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getGame, getPlayer, getCurrBoard, game, player } = props;

    useEffect(() => {
      debugger;
      getCurrBoard(parseInt(id))
      getGame(parseInt(id));
      getPlayer(game?.player_one_id || 1);
    
  }, [id, getGame, getPlayer, getCurrBoard]);

  if ( !game || !player || !props.currBoard){
    return <></>;
  }

    if (props.moveFetchStatus === "success") {
      alert("this happened")
        props.getCurrBoard(parseInt(id));
        props.moveReset();
    }

  return (
    <div>
        Player one ID: {game.player_one_id}
        Player one Email: {player.email}
        Player two ID: 
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
  player: SelectPlayer.data(state),
  playerError: SelectPlayer.error(state),
  playerFetchStatus: SelectPlayer.status(state),

  game: SelectGame.data(state),
  gameError: SelectGame.error(state),
  gameFetchStatus: SelectGame.status(state),

  currBoard: SelectCurrBoard.data(state),
  currBoardError: SelectCurrBoard.error(state),
  currBoardFetchStatus: SelectCurrBoard.status(state),

  moveFetchStatus: SelectAddMove.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  getGame: (id) => dispatch(fetchGame(id)),
  getCurrBoard: (id) => dispatch(fetchCurrBoard(id)),
  moveReset: () => dispatch(addMoveReset()),

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