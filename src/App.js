import { useState, useEffect } from 'react';
import { CheckersSection, Div } from './css/CheckersSection.Style';

import DragAndDrop from './hooks/helper/drop/DragAndDrop';
import ChessMapGenerator from './service/BoardGenerator';
import helper from './constants/helper';

const App = () => {
  const [gameOver, setGameOver] = useState(false);
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
    <CheckersSection>
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
          ></Div>
        );
      })}
    </CheckersSection>
  );
};

export default App;
