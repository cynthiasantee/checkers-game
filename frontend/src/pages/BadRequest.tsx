import React from "react";
import styled from "styled-components/macro";
import page from './page';

const BadRequest = () => {
  return (
    <Container>
       <h2>Bad Request</h2>
        <h3>Your browser sent a request that this server could not understand.</h3>
    </Container>
  );
};

export default page("bad-request")(BadRequest);

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2,
  h3 {
    padding: 20px;
  }
`;
