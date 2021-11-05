import React from 'react';
import { LinkDiv, Main } from '../css/Main.Style';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Main>
      <Link to="/game">
        <LinkDiv>GAME</LinkDiv>
      </Link>
      <Link to="/help">
        <LinkDiv>HELP</LinkDiv>
      </Link>
    </Main>
  );
}

export default Home;
