import { WallPanelControl } from '../helper/board/index';
import {
  yAxisBottom,
  yAxisTop,
  xAxisBottom,
  xAxisTop
} from './data/queenAxisHelper';

import BlockFinder from '../helper/board/blockFinder';
import dataSetter from '../helper/data/queenSetter';

// type: `${color}Queen, ${takePawn.type}`,
// Img: type === "white" ? WhiteQueen : BlackQueen,

const ControlQueen = (props) => {
  const PROPS = { ...props };

  const XCheckTop = XTopPanel({ ...PROPS }); //!
  const YCheckTop = YTopPanel({ ...PROPS }); //?
  const XCheckBottom = XBottomPanel({ ...PROPS }); //?
  const YCheckBottom = YBottomPanel({ ...PROPS }); //!

  return { XCheckTop, YCheckBottom };
};

export default ControlQueen;

const YTopPanel = (props) => {
  const { takePawn, boardData, currentPlayer } = props;
  const jumper = 7;

  const YAxis = yAxisTop(props);
  const data = BlockFinder(YAxis, currentPlayer, boardData, jumper);

  console.log(data);
  return {};
};

const YBottomPanel = (props) => {
  const { takePawn, boardData, currentPlayer } = props;
  const jumper = 9;

  const YAxis = yAxisBottom(props);
  const data = BlockFinder(YAxis, currentPlayer, boardData, jumper);

  const equalPlayer = data.filter((el) => el.id > takePawn.id);

  const clearMove = equalPlayer
    .filter((el) => typeGenerator(el.type) === typeGenerator(takePawn.type))
    .map(({ id }) => id)
    .shift();

  const move = equalPlayer.filter(({ id }) => id < clearMove);

  const moves = clearMove ? move : equalPlayer;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);

  const JumpsChecker = getPawns.map((el) => el + jumper);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter((el) => el.type)
    .shift()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id < checkJumps - 9)
    : moves;

  const theSamePawn = [...YAxis]
    .filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        typeGenerator(type) === typeGenerator(takePawn.type)
    )
    .map(({ id }) => id)
    ?.shift();

  const onlyCorrectMove = YAxis.filter(
    ({ type, id }) =>
      id !== takePawn.id && typeGenerator(type) === typeGenerator(takePawn.type)
  ).shift()?.id;

  const displayOnlyMove = YAxis.filter(
    ({ type, id }) => id !== takePawn.id && type === ''
  );

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id < onlyCorrectMove)
    : displayOnlyMove;

  const blockMoveAfterEnemy = correctMove
    .filter(
      ({ type }) =>
        type !== '' && typeGenerator(type) !== typeGenerator(takePawn.type)
    )
    .pop()?.id;

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id > takePawn.id && id < theSamePawn)
    : correctMove;

  const correctBlock = correctData.filter(
    ({ id }) => id <= blockMoveAfterEnemy + jumper
  );

  const checkDisplay = correctData
    .map(({ type }) => type)
    .every((index) => index === '');

  const detectAttack = !checkDisplay
    ? { data: correctBlock, jump: true }
    : { data: displayMove, jump: false };

  return detectAttack;
};

const XTopPanel = (props) => {
  const PROPS = { ...props };
  const { takePawn, boardData, currentPlayer, leftWall } = props;
  const upJumper = 9;
  const jumper = 9;

  const xTopAxis = xAxisTop({ ...PROPS, upJumper });
  const moves = xTopAxis.map(({ id }) => id);
  const data = BlockFinder(xTopAxis, currentPlayer, boardData, 9);

  const equalPlayer = data.filter((el) => el.id <= takePawn.id);

  const onlyEmptyJump = equalPlayer
    .filter((el) => el.type === '')
    .map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);
  const { JumpMove } = dataSetter({ ...PROPS, jumper, getNumbers });

  const dataBlocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = props.id - el;
          return check >= jumper ? el : undefined;
        })
      : JumpMove;

  const clearBlocker = dataBlocker.filter((el) => el);

  const id = clearBlocker.shift();

  const type = typeGenerator(takePawn.type);

  const illegalWall = WallPanelControl(boardData);

  const detectMove = xTopAxis
    .filter(
      (el) =>
        el.type && typeGenerator(el.type) !== type && el.id !== takePawn.id
    )
    .map((el) => {
      const id = Number(el.id);

      return illegalWall.includes(id) ? undefined : id;
    })
    .filter((el) => el);

  const checkMove = detectMove.map((el) => el - 9);

  const checkPossibleJump = boardData
    .filter((el) => checkMove.includes(el.id))
    .filter((el) => el.type);

  const jumpBlocker = checkPossibleJump ? checkPossibleJump.pop() : undefined;

  const movesResult = moves.filter((el) => el >= id && el < takePawn.id);

  const correctMoves = movesResult.filter((el) =>
    jumpBlocker ? el > jumpBlocker.id : el
  );

  const blocker = boardData
    .filter((el) => correctMoves.includes(el.id))
    .map((el) => {
      const id = el.id;
      const type = typeGenerator(el.type);
      return { id, type };
    });

  const findPlayer = blocker.find((el) => el.type === currentPlayer);

  const correctData =
    findPlayer !== undefined
      ? correctMoves.filter((el) => el > findPlayer.id)
      : correctMoves;

  const wallCollision = xTopAxis
    .filter((el) => leftWall.includes(el.id))
    .map(({ id }) => id);

  const wallMoves = xTopAxis.filter(
    ({ id }) => id >= wallCollision && id < takePawn.id
  );

  const onlyMove = wallMoves.map(({ type }) => type).every((el) => el === '');

  const move = wallMoves.map(({ id }) => id);

  const onlyCorrectMove = xTopAxis
    .filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        typeGenerator(type) === typeGenerator(takePawn.type)
    )
    .shift()?.id;

  const displayOnlyMove = xTopAxis.filter(
    ({ type, id }) => id !== takePawn.id && type === ''
  );

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id > onlyCorrectMove)
    : displayOnlyMove;

  const detectAttack =
    detectMove.length && correctMoves.length > 1
      ? { data: correctData, jump: true }
      : { data: onlyMove ? move : displayMove, jump: false };

  return detectAttack;
};

const XBottomPanel = (props) => {
  const moveAxisA = xAxisBottom(props);

  return moveAxisA;
};

const typeGenerator = (type) =>
  type.includes('Queen')
    ? type.split(' ')[0].replace(/[,]/g, ' ').split(' ').pop()
    : type.split(' ')[0].replace(/[,]/g, '');
