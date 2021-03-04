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
    squareLocation: Location;
    children?: any;
}

interface StateProps {
    selectedPiece: Location| null;
    board: BoardSquare[][] | undefined;
}

interface DispatchProps {
    selectPiece: (location: Location) => void;
}


const Piece: React.FC<OwnProps & StateProps & DispatchProps> = (props) => {
    const {board} = props;

    if (!board) {
        return <>{props.children}</>;
    }

    const onPieceSelect = () => {
        props.selectPiece(props.squareLocation);
    }
    
    return (
        <Container color={props.color}  onClick={onPieceSelect} squareLocation={props.squareLocation} selectedPiece={props.selectedPiece}>
            {props.children}
        </Container>
    )
}

const Container = styled.div<{color: Color; squareLocation: Location; selectedPiece: Location | null}>`
    border: ${((props) => props.squareLocation === props.selectedPiece ? "3px solid yellow" : "3px solid white")};
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: ${((props) => props.color)};
    display: flex;
    align-items: center;
    justify-content: center;
`
const mapStateToProps = (state: RootState): StateProps => ({
    selectedPiece: state.selectPiece,
    board: SelectAddMove.data(state),

});
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    selectPiece: (location) => dispatch(selectPiece(location))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Piece);