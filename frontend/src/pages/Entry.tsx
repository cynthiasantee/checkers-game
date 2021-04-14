import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import page from './page';

//Redux
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';

interface StateProps {

}

interface DispatchProps {

}

const Game = (props: StateProps & DispatchProps) => {

  return (
   <></>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({

});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({


});
export default page("game")(connect(mapStateToProps, mapDispatchToProps)(Game));

const Container = styled.div`

`