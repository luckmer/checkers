import { useState } from 'react';

import { switchPlayer, SwitchQueen } from './hooks/helper/player/index';
import { BoardUpdate, CreateQueen } from './hooks/helper/board/index';
import ChessMapGenerator from './service/BoardGenerator';
import * as constants from './constants/helper';

import { ControlRightSite, ControlLeftSite } from './hooks/pawn/index';
import { CheckersSection, Div } from './css/CheckersSection.Style';
import { moveIndex } from './hooks/pawn/MovePawn';
import { WallPanelControl } from './hooks/helper';
import { direction } from './constants';
import ControlQueen from './hooks/Queen/ControlQueen';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('white');

  const { boardData, setBoard } = ChessMapGenerator();

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e) => {
    const targetId = e.target.id;
    e.dataTransfer.setData('id', targetId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('id'));
    const drop = Number(e.target.id);

    const takePawn = constants?.find(boardData, id);
    const takeDropPawn = constants?.find(boardData, drop);

    const queens = ['whiteQueen', 'blackQueen'];

    const pawnType = constants.pawnType(takePawn.type);
    const pawnQueen = constants.queenType(takePawn.type);

    const pawnSwitcher = queens.includes(pawnType) ? pawnQueen : pawnType;

    if (currentPlayer !== pawnSwitcher) return;

    const pawnMoves = moveIndex(pawnType, id);

    const { leftWall, rightWall, whiteWall, blackWall, illegalPosition } =
      WallPanelControl(boardData);

    const clearMove = pawnMoves.filter((el) => !illegalPosition.includes(el));

    const move = illegalPosition.includes(id) ? clearMove : pawnMoves;

    const props = {
      boardData,
      takePawn,
      direction,
      leftWall,
      rightWall,
      currentPlayer,
      id,
      move,
      pawnType,
      drop
    };

    if (pawnType.toLowerCase().includes('queen')) {
      const { XCheckTop, YCheckBottom, YCheckTop, XCheckBottom } = ControlQueen(
        {
          ...props
        }
      );

      const moves = [
        { data: XCheckTop.data, arr: '1', axis: 'less' },
        { data: YCheckBottom.data, arr: '2', axis: 'less' },
        { data: YCheckTop.data, arr: '3', axis: 'more' },
        { data: XCheckBottom.data, arr: '4', axis: 'less' }
      ];
      const moveData = moves.map(({ data }) => data);

      const clearRoad = moves.find((el) => el.data.includes(drop));

      console.log(moveData);
      const dropSwitcher = constants.combineArray(moveData).includes(drop);

      if (takeDropPawn && takeDropPawn.type === '' && dropSwitcher) {
        const update = CreateQueen({ ...props, clearRoad });
        setBoard(update);
        const queenSwitcher = SwitchQueen(props);

        if (!queenSwitcher) {
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        }
      }
    } else {
      const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite({
        ...props
      });

      const { test, CorrectRightMove, oneYAxis } = ControlRightSite({
        ...props
      });

      const sameMove = constants.checkArrays(test.data, detectAttack.data);

      const detectValues = sameMove
        ? detectAttack
        : test.jump && detectAttack.jump
        ? { detectAttack, test }
        : test.jump && test.data.length
        ? test
        : detectAttack.jump && detectAttack.data.length
        ? detectAttack
        : move;

      const PROPS = {
        CorrectRightMove,
        correctLeftMove,
        currentPlayer,
        boardData,
        pawnType,
        drop
      };

      const playerChanger = switchPlayer({ ...PROPS });

      const dropSwitcher =
        detectValues && detectValues?.data
          ? detectValues?.data.includes(drop)
          : detectValues &&
            [
              ...detectValues?.detectAttack.data,
              ...detectValues?.test.data
            ]?.includes(drop);

      if (takeDropPawn && takeDropPawn.type === '' && dropSwitcher) {
        const update =
          blackWall.includes(drop) || whiteWall.includes(drop)
            ? CreateQueen(props)
            : BoardUpdate({ ...props, oneYAxis, oneAxis });

        setBoard(update);

        if ((!CorrectRightMove && !correctLeftMove) || !playerChanger) {
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        }
      }
    }
  };

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

//TODO
//fix queen switcher
//fix queen clear method
