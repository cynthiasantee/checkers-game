import React from 'react';
import styled from 'styled-components'
import WhiteSquare from './Components/WhiteSquare'
import BlackSquare from './Components/BlackSquare'
import BlackPiece from './Components/BlackPiece'
import WhitePiece from './Components/WhitePiece'
import DoubleWhite from './Components/DoubleWhite'
import DoubleBlack from './Components/DoubleBlack'

const App: React.FC = () => {
  return (
    <Container>
      <WhiteSquare></WhiteSquare>
      <BlackSquare></BlackSquare>
      <BlackPiece></BlackPiece>
      <WhitePiece></WhitePiece>
      <DoubleWhite></DoubleWhite>
      <DoubleBlack></DoubleBlack>
    </Container>
  );
}

const Container = styled.div`

`

export default App;
