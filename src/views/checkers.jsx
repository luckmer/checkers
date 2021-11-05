import { useState, useEffect } from 'react';
import { CheckersSection, Div } from '../css/CheckersSection.Style';
import { Link } from 'react-router-dom';

import DragAndDrop from '../hooks/helper/drop/DragAndDrop';
import ChessMapGenerator from '../service/BoardGenerator';
import helper from '../constants/helper';
import styled from 'styled-components';

function Checkers() {
  const [gameOver, setGameOver] = useState({
    winner: '',
    status: false
  });
  const [currentPlayer, setCurrentPlayer] = useState('white');

  const { boardData, setBoard } = ChessMapGenerator();

  useEffect(() => {
    if (!boardData.length) return;

    const arr = boardData;

    const getPawns = arr.filter(({ type }) => type).map(({ type }) => type);

    const createType = getPawns.map((type) => helper.queenType(type));
    const map = {};

    createType.forEach((el) => (map[el] = (map[el] || 0) + 1));
  }, [boardData]);

  const { handleDragOver, handleDragStart, handleDrop } = DragAndDrop(
    boardData,
    currentPlayer,
    setBoard,
    setCurrentPlayer
  );

  return (
    <Main>
      <Nav>
        <div>
          <p>
            Current Player: <Span>{currentPlayer}</Span>
          </p>
        </div>
        <div>
          <Link to="*">
            <Span>Home</Span>
          </Link>
        </div>
      </Nav>
      <TestA>
        <CheckersSection>
          <DisplayNumbers />
          <TestF>
            {boardData.map((el, i) => {
              const check = el.Img === 'Empty';
              return (
                <Div
                  key={i}
                  type={el.type}
                  id={el.id}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragStart={(e) => (check ? null : handleDragStart(e))}
                  onDrop={(e) => handleDrop(e)}
                  Design={el.background}
                  IMG={el.Img}
                  draggable={check ? null : true}
                />
              );
            })}
          </TestF>
        </CheckersSection>
        <DisplayLetters />
      </TestA>
    </Main>
  );
}

export default Checkers;

const DisplayNumbers = () => {
  const numbers = new Array(8).fill(0).map((_, i) => i + 1);

  return (
    <Numbers>
      {numbers.map((el) => (
        <Spacer key={el}>
          <p>{el}</p>
        </Spacer>
      ))}
    </Numbers>
  );
};

const DisplayLetters = () => {
  const letters = new Array(8)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i));

  return (
    <Letters>
      <Spacer />
      {letters.map((el) => (
        <Spacer key={el}>
          <p>{el}</p>
        </Spacer>
      ))}
    </Letters>
  );
};

const Span = styled.span`
  color: #ebebd0;
`;

const Nav = styled.nav`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 20px 10px 20px;
  color: grey;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;

const Spacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 75px;
    width: 75px;
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 50px;
    width: 50px;
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 30px;
    width: 30px;
  }
`;

const TestF = styled.div`
  display: flex;
  flex-flow: row wrap;

  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 600px;
    width: 600px;
    grid-template-columns: repeat(8, 75px);
    grid-template-rows: repeat(8, 75px);
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 400px;
    width: 400px;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 240px;
    width: 240px;
    grid-template-columns: repeat(8, 30px);
    grid-template-rows: repeat(8, 30px);
  }
`;

const TestA = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Numbers = styled.div`
  color: white;
`;

export const UpperDiv = styled.div``;

const Letters = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;
