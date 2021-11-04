import { useState, useEffect } from 'react';

import ChessMapGenerator from './service/BoardGenerator';
import ControlQueen from './hooks/Queen/ControlQueen';
import helper from './constants/helper';

import { switchPlayer, SwitchQueen } from './hooks/helper/player/index';
import { ControlRightSite, ControlLeftSite } from './hooks/pawn/index';
import { BoardUpdate, CreateQueen } from './hooks/helper/board/index';
import { CheckersSection, Div } from './css/CheckersSection.Style';
import { moveIndex } from './hooks/pawn/MovePawn';
import { WallPanelControl } from './hooks/helper';
import { direction } from './constants';

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

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e) => {
    const targetId = e.target.id;
    e.dataTransfer.setData('id', targetId);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData('id'));
    const drop = Number(e.target.id);

    const takePawn = helper?.find(boardData, id);
    const takeDropPawn = helper?.find(boardData, drop);

    const queens = ['whiteQueen', 'blackQueen'];

    const pawnType = helper.pawnType(takePawn?.type);
    const pawnQueen = helper.queenType(takePawn?.type);

    const pawnSwitcher = queens.includes(pawnType) ? pawnQueen : pawnType;

    if (currentPlayer !== pawnSwitcher) return;

    const pawnMoves = moveIndex(pawnType, id);

    const { leftWall, rightWall, whiteWall, blackWall, illegalPosition } =
      WallPanelControl(boardData);

    const clearMove = pawnMoves.filter((el) => !illegalPosition.includes(el));

    const move = illegalPosition.includes(id) ? clearMove : pawnMoves;

    const wallProps = { leftWall, rightWall, whiteWall, blackWall };

    const playerProps = { takePawn, direction, currentPlayer, pawnType };
    const props = { ...wallProps, ...playerProps, boardData, id, move, drop };

    switch (pawnType) {
      case pawnType.toLowerCase().includes('queen'):
        Queen({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
      default:
        Pawn({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
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

const Queen = (props) => {
  const {
    setCurrentPlayer,
    currentPlayer,
    takeDropPawn,
    rightWall,
    leftWall,
    setBoard,
    drop
  } = props;

  const { XCheckTop, YCheckBottom, YCheckTop, XCheckBottom } = ControlQueen({
    ...props
  });

  const moves = [
    { arr: 'more', option: XCheckTop, data: XCheckTop.data, axis: 'less' },
    {
      arr: 'less',
      option: YCheckBottom,
      data: YCheckBottom.data,
      axis: 'less'
    },
    { arr: 'more', option: YCheckTop, data: YCheckTop.data, axis: 'more' },
    {
      arr: 'less',
      option: XCheckBottom,
      data: XCheckBottom.data,
      axis: 'less'
    }
  ];

  const moveData = moves.map(({ data }) => data);

  const dropMove = helper.combineArray(moveData);

  const dropSwitcher = dropMove.includes(drop);

  const clearRoad = moves.find(({ data }) => data.includes(drop));

  const attacks = moves
    .filter(({ option }) => option.jump === true)
    .map(({ data }) => {
      if (drop % 8 === 2) {
        const illegalLeftData = rightWall.filter((el) => data.includes(el));

        return data.filter((el) => !illegalLeftData.includes(el));
      }

      if (drop % 8 === 7) {
        const illegalRightData = leftWall.filter((el) => data.includes(el));

        return data.filter((el) => !illegalRightData.includes(el));
      }

      return data;
    });

  const connectAttacks = [...new Set(helper.combineArray(attacks))];

  const dropAttack = connectAttacks.includes(drop);

  const attack = connectAttacks.length ? dropAttack : dropSwitcher;

  if (takeDropPawn && takeDropPawn.type === '' && attack) {
    const update = CreateQueen({ ...props, clearRoad });

    setBoard(update);
    const queenSwitcher = SwitchQueen({ ...props, clearRoad });

    if (!queenSwitcher) {
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  }
};

const Pawn = (props) => {
  const { currentPlayer, boardData, pawnType, drop } = props;
  const { takeDropPawn, whiteWall, blackWall, setBoard, setCurrentPlayer } =
    props;

  const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite({
    ...props
  });

  const { test, CorrectRightMove, oneYAxis } = ControlRightSite({
    ...props
  });

  const dropSwitcher = PawnAttack({ ...props, detectAttack, test });

  const PROPS = {
    CorrectRightMove,
    correctLeftMove,
    currentPlayer,
    boardData,
    pawnType,
    drop
  };

  const playerChanger = switchPlayer({ ...PROPS });

  if (takeDropPawn && takeDropPawn.type === '' && dropSwitcher) {
    const update =
      blackWall.includes(drop) || whiteWall.includes(drop)
        ? CreateQueen({ ...props, oneYAxis, oneAxis })
        : BoardUpdate({ ...props, oneYAxis, oneAxis });

    setBoard(update);

    if ((!CorrectRightMove && !correctLeftMove) || !playerChanger) {
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  }
};

const PawnAttack = (props) => {
  const { move, drop, detectAttack, test } = props;

  const sameMove = helper.checkArrays(test.data, detectAttack.data);

  const detectValues = sameMove
    ? detectAttack
    : test.jump && detectAttack.jump
    ? { detectAttack, test }
    : test.jump && test.data.length
    ? test
    : detectAttack.jump && detectAttack.data.length
    ? detectAttack
    : move;

  return detectValues && detectValues?.data
    ? detectValues && detectValues?.data.includes(drop)
    : detectValues && detectValues?.detectAttack
    ? [
        ...detectValues?.detectAttack.data,
        ...detectValues?.test.data
      ]?.includes(drop)
    : detectValues.includes(drop);
};
