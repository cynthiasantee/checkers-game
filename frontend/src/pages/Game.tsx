import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { initialBoard } from '../redux/reducer/board';
import WhiteSquare from '../components/WhiteSquare';
import BlackSquare from '../components/BlackSquare';
import BlackPiece from '../components/BlackPiece';
import WhitePiece from '../components/WhitePiece';
import DoubleWhite from '../components/DoubleWhite';
import DoubleBlack from '../components/DoubleBlack';
import { Player } from '../redux/api/getPlayerApi';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { AppDispatch, RootState } from '../redux/store';
import { SelectPlayer } from '../redux/selector/getPlayerSelector';
import { fetchPlayer } from "../redux/thunk/getPlayerThunk";
import { connect } from 'react-redux';
import page from '../components/page';
import { useParams } from "react-router-dom";

interface StateProps {
  player?: Player;
  error?: MyKnownError;
  fetchStatus: FetchStatus;
}

interface DispatchProps {
  getPlayer: (id: number) => void;
}

const Game = (props: StateProps & DispatchProps) => {
    const { id } = useParams<{ id: string }>();
    const { getPlayer } = props;

  useEffect(() => {
    getPlayer(parseInt(id));
  }, [id, getPlayer]);

//   if (props.error === "400") {
//     return <Redirect to="/bad-request" />;
//   }

  if (!props.player) {
    return <></>;
  }

  return (
    <div>
        {props.player.email}
    <Container>
      {initialBoard.map(row => row.map(square => {
        if (square.squareColor === 'black') {
          if (square.piece === null) {
            return <BlackSquare></BlackSquare>
          } else if (square.piece.color === 'white' && square.piece.isDouble === false) {
            return(
            <BlackSquare>
              <WhitePiece></WhitePiece>
            </BlackSquare>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === false) {
            return(
            <BlackSquare>
              <BlackPiece></BlackPiece>
            </BlackSquare>
            )
          } else if (square.piece.color === 'white' && square.piece.isDouble === true) {
            return(
            <BlackSquare>
              <WhitePiece>
                <DoubleWhite></DoubleWhite>
              </WhitePiece>
            </BlackSquare>
            )
          } else if (square.piece.color === 'black' && square.piece.isDouble === true) {
            return(
            <BlackSquare>
              <BlackPiece>
                <DoubleBlack></DoubleBlack>
              </BlackPiece>
            </BlackSquare>
            )
          }
        } else if (square.squareColor === 'white') {
          return <WhiteSquare></WhiteSquare>
        }
      }))}
    </Container>
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  player: SelectPlayer.data(state),
  error: SelectPlayer.error(state),
  fetchStatus: SelectPlayer.status(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getPlayer: (id) => dispatch(fetchPlayer(id)),
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