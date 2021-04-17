import { css } from "styled-components/macro";

export const formStyle = css`
  margin: 0 auto;
  width: 450px;

  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;

  @media (max-width: 500px) {
    padding: 5px;
    width: 98%;
  }

  h3 {
    text-align: center;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  label {
    display: inline-block;
    width: 90px;
    text-align: right;
    margin-right: 10px;

    @media (max-width: 500px) {
      text-align: left;
      margin-right: 0;
      margin-left: 10px;
    }
  }

  input {
    height: 35px;
    margin: 5px;
    padding-left: 10px;
  }

  input[type="text"],
  input[type="password"] {
    font: 1em sans-serif;
    width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;

    @media (max-width: 500px) {
      width: 95%;
    }
  }

  input:focus {
    border-color: #000;
  }

  .button {
    padding-left: 100px;

    @media (max-width: 500px) {
      padding-left: 0;
    }
  }

  input[type="submit"] {
    width: 300px;
    -webkit-appearance: none;

    @media (max-width: 500px) {
      width: 95%;
    }
  }

  a {
    display: inline-block;
    text-align: right;
    width: 100%;
    padding-right: 30px;
    width: 405px;

    @media (max-width: 500px) {
      width: 95%;
    }
  }
`;
