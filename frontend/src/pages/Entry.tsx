import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import page from './page';

//Redux
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';
import Register from './Register';
import Login from './Login';

interface StateProps {

}

interface DispatchProps {

}

const Entry = (props: StateProps & DispatchProps) => {

  return (
    <>
      <Register></Register>
      <Login></Login>
   </>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({

});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({


});
export default page("entry")(connect(mapStateToProps, mapDispatchToProps)(Entry));

const Container = styled.div`

`