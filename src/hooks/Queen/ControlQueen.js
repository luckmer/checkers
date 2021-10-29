import { WallPanelControl } from '../helper/board/index';
import {
  yAxisBottom,
  yAxisTop,
  xAxisBottom,
  xAxisTop
} from './data/queenAxisHelper';

import BlockFinder from '../helper/board/blockFinder';
import dataSetter from '../helper/data/queenSetter';

const ControlQueen = (props) => {
  const PROPS = { ...props };

  const XCheckTop = XTopPanel({ ...PROPS });
  const YCheckTop = YTopPanel({ ...PROPS });
  const XCheckBottom = XBottomPanel({ ...PROPS });
  const YCheckBottom = YBottomPanel({ ...PROPS });

  return { XCheckTop, YCheckBottom, YCheckTop, XCheckBottom };
};

export default ControlQueen;

export const XBottomPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, direction, leftWall } =
    props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 7;
  const pawnId = takePawn.id;
  const moveAxisA = xAxisBottom({ boardData, takePawn, direction, leftWall });
  const data = BlockFinder(moveAxisA, currentPlayer, boardData, jumper);
  const equalPlayer = data.filter(({ id }) => id > pawnId);

  const clearMove = equalPlayer
    .filter((el) => typeGenerator(el.type) === typeGenerator(takePawn.type))
    .map(({ id }) => id)
    .shift();

  const move = equalPlayer.filter(({ id }) => id < clearMove);
  const moves = clearMove ? move : equalPlayer;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);
  const JumpsChecker = getPawns.map((index) => index + 7);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter(({ type }) => type)
    .shift()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id < checkJumps - jumper)
    : moves;

  const blockMoveAfterEnemy = correctMove
    .filter(
      ({ type }) =>
        type !== '' && typeGenerator(type) !== typeGenerator(takePawn.type)
    )
    .pop()?.id;

  const theSamePawn = [...moveAxisA]
    .filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        typeGenerator(type) === typeGenerator(takePawn.type)
    )
    .map(({ id }) => id)
    ?.shift();

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id < theSamePawn)
    : correctMove;

  const checkDisplay = correctData
    .map(({ type }) => type)
    .every((index) => index === '');

  const correctBlock = correctData.filter(
    ({ id }) => id <= blockMoveAfterEnemy + jumper
  );

  const displayOnlyMove = moveAxisA.filter(
    ({ type, id }) => id !== takePawn.id && type === ''
  );

  const onlyCorrectMove = moveAxisA
    .filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        typeGenerator(type) === typeGenerator(takePawn.type)
    )
    .map(({ id }) => id)
    ?.shift();

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id < onlyCorrectMove)
    : displayOnlyMove;

  const display = displayMove.map(({ id }) => id);

  const displayBlock = correctBlock.map(({ id }) => id);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export const YTopPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, direction, rightWall } =
    props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 7;
  const pawnId = takePawn.id;
  const YAxis = yAxisTop({ boardData, takePawn, direction, rightWall });
  const data = BlockFinder(YAxis, currentPlayer, boardData, jumper);
  const equalPlayer = data.filter(({ id }) => id < pawnId);

  const clearMove = equalPlayer
    .filter((el) => typeGenerator(el.type) === typeGenerator(takePawn.type))
    .map(({ id }) => id)
    .pop();

  const move = equalPlayer.filter(({ id }) => id > clearMove);
  const moves = clearMove ? move : equalPlayer;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);
  const JumpsChecker = getPawns.map((el) => el - jumper);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter(({ type }) => type)
    .pop()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id > checkJumps + jumper)
    : moves;

  const theSamePawn = [...YAxis]
    .filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        typeGenerator(type) === typeGenerator(takePawn.type)
    )
    .map(({ id }) => id)
    ?.pop();

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id > theSamePawn)
    : correctMove;

  const blockMoveAfterEnemy = correctMove
    .filter(
      ({ type }) =>
        type !== '' && typeGenerator(type) !== typeGenerator(takePawn.type)
    )
    .shift()?.id;

  const correctBlock = correctData.filter(
    ({ id }) => id >= blockMoveAfterEnemy - jumper
  );

  const checkDisplay = correctData
    .map(({ type }) => type)
    .every((index) => index === '');

  const onlyCorrectMove = YAxis.filter(
    ({ type, id }) =>
      id !== takePawn.id && typeGenerator(type) === typeGenerator(takePawn.type)
  )
    .map(({ id }) => id)
    ?.pop();

  const displayOnlyMove = YAxis.filter(({ id }) => id !== takePawn.id);

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id > onlyCorrectMove)
    : displayOnlyMove;

  const display = displayMove.map(({ id }) => id);
  const displayBlock = correctBlock.map(({ id }) => id);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export const YBottomPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, direction, rightWall } =
    props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 9;

  const YAxis = yAxisBottom({ boardData, takePawn, direction, rightWall });
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

  const display = displayMove.map(({ id }) => id);
  const displayBlock = correctBlock.map(({ id }) => id);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export const XTopPanel = (props) => {
  const PROPS = { ...props };

  const { boardData, currentPlayer, switchQueen, drop, direction, leftWall } =
    props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const upJumper = 9;
  const jumper = 9;

  const xTopAxis = xAxisTop({ boardData, direction, upJumper, takePawn });
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

  const { illegalWall } = WallPanelControl(boardData);

  const detectMove = xTopAxis
    .filter(
      (el) =>
        el.type && typeGenerator(el.type) !== type && el.id !== takePawn.id
    )
    .map((el) => {
      const id = Number(el.id);

      return illegalWall?.includes(id) ? undefined : id;
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

const typeGenerator = (type) =>
  type.includes('Queen')
    ? type.split(' ').pop()
    : type.split(' ')[0].replace(/[,]/g, '');
