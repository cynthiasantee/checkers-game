import React from 'react';
import styled from 'styled-components/macro';
import { BoardSquare, Color, Move } from '../redux/api/addMoveApi';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
import { Location } from '../util/move';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { SelectAddMove } from '../redux/selector/addMoveSelector';
import { addMove } from '../redux/thunk/addMoveThunk';

interface OwnProps {
    color: Color;
    children?: any;
}

interface StateProps {
    selectedPiece: Location| null;
    //copied from Game
    move?: BoardSquare[][];
    moveError?: MyKnownError;
    moveFetchStatus: FetchStatus;
}

interface DispatchProps {
    addMove: (id: number, move: Move) => void;
}

const Square: React.FC<OwnProps & StateProps & DispatchProps> = (props) => {
    return (
        <Container color={props.color}>
            {props.children}
        </Container>
    )
}

const Container = styled.div<{color: Color}>`
    height: 80px;
    width: 80px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`


const mapStateToProps = (state: RootState): StateProps => ({
    selectedPiece: state.selectPiece,
    move: SelectAddMove.data(state),
    moveError: SelectAddMove.error(state),
    moveFetchStatus: SelectAddMove.status(state)
});
  
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    addMove: (id, move) => dispatch(addMove(id, move)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Square);
