import React from 'react';
import styled from 'styled-components/macro';
import { initialBoard } from './State/slices';
import WhiteSquare from './Components/WhiteSquare';
import BlackSquare from './Components/BlackSquare';
import BlackPiece from './Components/BlackPiece';
import WhitePiece from './Components/WhitePiece';
import DoubleWhite from './Components/DoubleWhite';
import DoubleBlack from './Components/DoubleBlack';

const App: React.FC = () => {
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_CHECKERS_GAME_API}/players`
      );
    const playerList = await response.json();
      if (playerList && Array.isArray(playerList) && playerList.length) {
        // @ts-ignore
        setPlayers(playerList);
      }
    };
    getPlayers();
  }, []);

  return (
    <div>
      <div>
      {players && players.length
        ? players.map((p: any, i: number) => {
            return (
              <div key={i}>
                {`${p}`}
                <br />
              </div>
            );
          })
        : 'No player to display'}
    </div>
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

const Container = styled.div`
  height: 640px;
  width: 640px;
  display: flex;
  flex: direction: row;
  flex-wrap: wrap;
  border: 1px solid black
`

export default App;