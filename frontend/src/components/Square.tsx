import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { BoardSquare, Color, Move } from '../redux/api/addMoveApi';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
import { Location } from '../util/move';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { SelectAddMove } from '../redux/selector/addMoveSelector';
import { addMove } from '../redux/thunk/addMoveThunk';
import {addMoveReset} from "../redux/reducer/addMoveReducer"
import { fetchCurrBoard } from '../redux/thunk/getCurrBoardThunk';
import { useParams } from "react-router-dom";
import { deselectPiece } from "../redux/reducer/selectPiece"
import { SelectCurrBoard } from '../redux/selector/getCurrBoardSelector';

interface OwnProps {
    color: Color;
    location: Location;
    hasPiece: boolean;
    children?: any;
}

interface StateProps {
    selectedPiece: Location| null;

    makeMove?: string;
    moveError?: MyKnownError;
    moveFetchStatus: FetchStatus;

    currBoard?: BoardSquare[][];
    currBoardError?: MyKnownError;
    currBoardStatus: FetchStatus;
}

interface DispatchProps {
    addMove: (id: number, move: Move) => void;
    deselectPiece: () => void;
    getCurrBoard: (id: number) => void;
    moveReset: () => void;
}

const Square: React.FC<OwnProps & StateProps & DispatchProps> = (props) => {
    const { id } = useParams<{ id: string }>();

    // useEffect(() => {
    //     if (props.moveFetchStatus === "success") {
    //         debugger;
    //         props.getCurrBoard(parseInt(id));
    //         props.moveReset();
    //     }      
    // }, [props.moveFetchStatus, id, props.getCurrBoard, props.moveReset]);

    // useEffect(() => {

    // }, [props.currBoard]);

    const onSquareClick = () => {
        if (props.selectedPiece !== null && !props.hasPiece) {

            props.addMove(parseInt(id), {
                from_i: props.selectedPiece[0],
                from_j: props.selectedPiece[1],
                to_i: props.location[0],
                to_j: props.location[1],
            });
            props.deselectPiece();
            // props.getCurrBoard(parseInt(id));


            // props.moveReset();
        }
    }

    // if (props.moveFetchStatus === "success") {
    //     props.getCurrBoard(parseInt(id)); //happens many times
    //     props.moveReset();
    // }

    return (
        <Container color={props.color} location={props.location} onClick={onSquareClick}>
            {props.children}
        </Container>
    )
}

const Container = styled.div<{color: Color; location: Location}>`
    height: 80px;
    width: 80px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`

const mapStateToProps = (state: RootState): StateProps => ({
    selectedPiece: state.selectPiece,
    makeMove: SelectAddMove.data(state),
    moveError: SelectAddMove.error(state),
    moveFetchStatus: SelectAddMove.status(state),

    currBoard: SelectCurrBoard.data(state),
    currBoardError: SelectCurrBoard.error(state),
    currBoardStatus: SelectCurrBoard.status(state),
});
  
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    addMove: (id, move) => dispatch(addMove(id, move)),
    deselectPiece: () => dispatch(deselectPiece()),
    moveReset: () => dispatch(addMoveReset()),
    getCurrBoard: (id) => dispatch(fetchCurrBoard(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(Square);
