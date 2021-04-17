import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { navBarHeight } from '../util/navBarHeight';
import { logout } from "../redux/thunk/logoutThunk";
import logoFour from '../logo/logoFour.png'
import { SelectPage } from '../redux/selector/page';

const NavBar = () => {
  const dispatch = useDispatch();
  const page = useSelector(SelectPage.page);

  return page === "entry" || page === "reset-password" || page === "bad-request" ? (
    <></>
  ) : (
    <Nav>
      <ul>
        <img src={logoFour} alt="logo" />
        <li className="first">
          <Link to="/home">Home</Link>
        </li>
        <li className="last">
          <Link to="/" onClick={() => dispatch(logout())}>Log out</Link>
        </li>
      </ul>
    </Nav>
  );   
}

export default NavBar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: ${navBarHeight};
  background-color: #555555;
  z-index: 99;
  box-sizing: border-box;
  border-bottom: 2px solid gray;

  img {
    height: 50px;
    width: auto;

    @media (max-width: 430px) {
      height: 35px;
    }
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

      @media (max-width: 380px) {
        font-size: 1.0rem;
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

      @media (max-width: 380px) {
        margin-right: 20px;
      }
    }

    .first {
      margin-left: 50px;
      @media (max-width: 380px) {
        margin-left: 30px;
      }
    }
  }
`