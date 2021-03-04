import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import { BoardSquare, Color } from '../redux/api/addMoveApi';
import { SelectAddMove } from '../redux/selector/addMoveSelector';
import { AppDispatch, RootState } from '../redux/store';
import { Location } from '../util/move';
import {selectPiece} from "../redux/reducer/selectPiece"

interface OwnProps {
    color: Color;
    id: number;
    isDouble: boolean;
    children?: any;
}

interface StateProps {
    selectedPiece: Location| null;
    board: BoardSquare[][] | undefined;
}

interface DispatchProps {
    selectPiece: (id: number, board: BoardSquare[][]) => void;
}


const Piece: React.FC<OwnProps & StateProps & DispatchProps> = (props) => {
    const {board} = props;

    if (!board) {
        return <>{props.children}</>;
    }
    
    return (
        <Container color={props.color}  onClick={() => props.selectPiece(props.id, board)}>
            {props.children}
        </Container>
    )
}

//onClick={() => {console.log(initialBoard[0][1].piece?.id)}}

const Container = styled.div<{color: Color}>`
    border: 1px solid white;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: ${((props) => props.color)};
    display: flex;
    align-items: center;
    justify-content: center;
`
const mapStateToProps = (state: RootState): StateProps => ({
    // player: SelectPlayer.data(state),
    selectedPiece: state.selectPiece,
    board: SelectAddMove.data(state),

});
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    // getPlayer: (id) => dispatch(fetchPlayer(id)),
    selectPiece: (id, board) => dispatch(selectPiece({pieceId: id, board}))

  });

export default connect(mapStateToProps, mapDispatchToProps)(Piece);