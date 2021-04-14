import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Page } from '../pages/page';
import { SelectLogout } from '../redux/selector/logoutSelector';
import { AppDispatch, RootState } from '../redux/store';
import { navBarHeight } from '../util/navBarHeight';
import { logout } from "../redux/thunk/logoutThunk";

interface StateProps {
  page: Page;
  logout?: string;
}

interface DispatchProps {
  onLogout: () => void;
}

const NavBar = (props: StateProps & DispatchProps) => {
  const onLogoutHandler = () => {
    props.onLogout();
  }

  return props.page === "entry" || props.page === "reset-password" ? (
    <></>
  ) : (
    <Nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li className="last">
          <Link to="/" onClick={onLogoutHandler}>Log out</Link>
        </li>
      </ul>
    </Nav>
  );  
  
}

const mapStateToProps = (state: RootState): StateProps => ({
  page: state.page,
  logout: SelectLogout.data(state)
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onLogout: () =>  dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  min-height: ${navBarHeight};
  background-color: gray;

  ul {
    display: flex;
    flex-direction: row;
    margin: 10px;
    

    li {
      list-style-type: none;
      font-size: 1.8rem;

      a {
        text-decoration: none;
      }
    }

    .last {
      margin-left: auto;
      margin-right: 40px;
    }
  }
`