import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Page } from '../pages/page';
import { SelectLogout } from '../redux/selector/logoutSelector';
import { AppDispatch, RootState } from '../redux/store';
import { navBarHeight } from '../util/navBarHeight';
import { logout } from "../redux/thunk/logoutThunk";
import logoOne from '../logo/logoOne.png'

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

  return props.page === "entry" || props.page === "reset-password" || props.page === "bad-request" ? (
    <></>
  ) : (
    <Nav>
      <ul>
        <img src={logoOne} alt="logo" />
        <li className="first">
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
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: ${navBarHeight};
  background-color: #555555;
  z-index: 99;

  img {
    height: 50px;
    width: 50px;
  }

  ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    

  li {
      list-style-type: none;
      font-size: 1.7rem;
      display: flex;
      align-items: center;

      @media (max-width: 500px) {
        margin-top: 8px;
        font-size: 1.2rem;
      }

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
  }

    .last {
      margin-right: 40px;
      margin-left: auto;
    }

    .first {
      margin-left: 20px;
    }
  }
`