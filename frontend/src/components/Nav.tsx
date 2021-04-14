import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Page } from '../pages/page';
import { RootState } from '../redux/store';
import { navBarHeight } from '../util/navBarHeight';

interface StateProps {
  page: Page;
}

const NavBar = (props: StateProps) => {
  return props.page === "login" || props.page === "register" || props.page === "reset-password" ? (
    <></>
  ) : (
    <Nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li className="last">
          <Link to="/home">Log out</Link>
        </li>
      </ul>
    </Nav>
  );  
  
}

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

const mapStateToProps = (state: RootState): StateProps => ({
   page: state.page,
});

export default connect<StateProps, {}, {}, RootState>(mapStateToProps)(NavBar);