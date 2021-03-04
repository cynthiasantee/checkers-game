import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
// import { initialBoard } from '../redux/reducer/board';
import Square from '../components/Square';
import Piece from '../components/Piece';
import Double from '../components/Double';
import { Player } from '../redux/api/getPlayerApi';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { AppDispatch, RootState } from '../redux/store';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
import { fetchPlayer } from "../redux/thunk/getPlayerThunk";
import { addMove } from "../redux/thunk/addMoveThunk";
import { connect } from 'react-redux';
import page from '../pages/page';
import { useParams } from "react-router-dom";
// import { BoardSquare, movePiece, MovePiecePayload } from '../redux/reducer/board';

import { BoardSquare, Move } from '../redux/api/addMoveApi';
import { SelectAddMove } from '../redux/selector/addMoveSelector';
import board, { getInitialBoard } from '../redux/reducer/addMoveReducer';

interface StateProps {
  player?: Player;
  playerError?: MyKnownError;
  playerFetchStatus: FetchStatus;

  //move
  move?: BoardSquare[][];
  moveError?: MyKnownError;
  moveFetchStatus: FetchStatus;
}

interface DispatchProps {
  getPlayer: (id: number) => void;
  getInitialBoard: () => void;
  // movePiece: (move: MovePiecePayload) => void;
  addMove: (id: number, move: Move) => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getPlayer, getInitialBoard } = props;

  useEffect(() => {
    getPlayer(parseInt(id));
    getInitialBoard();
  }, [id, getPlayer, getInitialBoard]);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.player || !props.move) {
    return <></>;
  }

  return (
    <div>
        {props.player.email}
        {/* <button onClick={() => props.movePiece({pieceId: 9, location: [7, 7]})}>Move piece</button> */}
        {/* <button onClick={() => props.addMove(parseInt(id), {"from_i": 1, "from_j": 2, "to_i": 0, "to_j": 3})}>Move piece</button> */}
    <Container>
      {props.move.map(row => row.map(square => {
        if (square.squareColor === 'black') {
          if (square.piece === null) {
            return <Square color="black"></Square>
          } else if (square.piece.color === 'white' && square.piece.isDouble === false) {
            return(
            <Square color="black">
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === false) {
            return(
            <Square color="black">
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble}></Piece>
            </Square>
            )
          } else if (square.piece.color === 'white' && square.piece.isDouble === true) {
            return(
            <Square color="black">
              <Piece color="white" id={square.piece.id} isDouble={square.piece.isDouble}>
                <Double color="white"></Double>
              </Piece>
            </Square>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === true) {
            return(
            <Square color="black">
              <Piece color="black" id={square.piece.id} isDouble={square.piece.isDouble}>
                <Double color="black"></Double>
              </Piece>
            </Square>
            )
          }
        } else if (square.squareColor === 'white') {
          return <Square color="white"></Square>
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
  // board: state.board,
  move: SelectAddMove.data(state),
  moveError: SelectAddMove.error(state),
  moveFetchStatus: SelectAddMove.status(state)
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
  // movePiece: (move) => dispatch(movePiece(move)),
  addMove: (id, move) => dispatch(addMove(id, move)),
  getInitialBoard: () => dispatch(getInitialBoard())
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