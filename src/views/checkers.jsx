import { useState, useEffect } from 'react';

import { Main } from '../css/CheckersSection.Style';

import DragAndDrop from '../hooks/helper/drop/DragAndDrop';
import ChessMapGenerator from '../service/BoardGenerator';
import Generator from '../service/Generator';
import CheckersGame from './CheckersGame';
import helper from '../constants/helper';
import GameOver from './GameOver';
import NavBar from './NavBar';

function Checkers() {
  const [gameOver, setGameOver] = useState({ winner: '', status: false });
  const [currentPlayer, setCurrentPlayer] = useState('white');

  const { boardData, setBoard } = ChessMapGenerator();

  useEffect(() => {
    if (!boardData.length) return;

    const arr = boardData;

    const getPawns = arr.filter(({ type }) => type).map(({ type }) => type);

    const createType = getPawns.map((type) => helper.queenType(type));
    const map = {};

    createType.forEach((el) => (map[el] = (map[el] || 0) + 1));

    if (!map['black'] || !map['white']) {
      setGameOver({ status: true, winner: !map['black'] ? 'white' : 'black' });
    }
  }, [boardData]);

  const dragProps = { boardData, currentPlayer, setBoard, setCurrentPlayer };
  const { handleDragOver, handleDragStart, handleDrop } = DragAndDrop({
    ...dragProps
  });

  const PROPS = { boardData, handleDragOver, handleDragStart, handleDrop };

  const handleRestartGame = () => {
    const map = Generator();
    setBoard(map);
    setCurrentPlayer('white');
    setGameOver({ winner: '', status: false });
  };

  return (
    <Main>
      <NavBar
        currentPlayer={currentPlayer}
        handleRestartGame={handleRestartGame}
      />
      {gameOver.status ? GameOver(gameOver.winner) : CheckersGame({ ...PROPS })}
    </Main>
  );
}

export default Checkers;
