import React from 'react';
import styled from 'styled-components/macro';
import page from './page';
import Register from './Register';
import Login from './Login';
import logoTwo from '../logo/logoTwo.png'


const Entry = () => {

  return (
    <Container>
      <img src={logoTwo} alt="logo" />
      <div className="form-container-wrapper">
        <div className="form-container">
          <Login></Login>
        </div>
        <div className="form-container">
          <Register></Register>
        </div>
      </div>

   </Container>
  );
}

export default page("entry")(Entry);

const Container = styled.div`  
  img {
    margin: 20px 0 20px 20px;
  }

  .form-container {
    display: inline-block;
    margin: 10px;

    @media (max-width: 500px) {
      width: 90%;
    }
  }

  .form-container-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`