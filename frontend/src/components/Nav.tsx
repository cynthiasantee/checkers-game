import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';


const NavBar = () => {
    return (
    <Nav className="Nav">
        <div className="Nav_container">
          <div className="Nav_right">
            <ul className="Nav_item-wrapper">
              <li className="Nav_item">
                <Link className="Nav_link" to="/path1">Link 1</Link>
              </li>
              <li className="Nav_item">
                <Link className="Nav_link" to="/path2">Link 2</Link>
              </li>
              <li className="Nav_item">
                <Link className="Nav_link" to="/path3">Link 3</Link>
              </li>
            </ul>
          </div>
        </div>
      </Nav>
    )
}

const Nav = styled.nav`

`

export default NavBar;