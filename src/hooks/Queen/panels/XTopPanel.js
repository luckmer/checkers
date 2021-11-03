import dataSetter from '../../helper/data/queenSetter';
import helper from '../../../constants/helper';
import help from '../data/queenAxisHelper';
import constants from './constants';

import { BlockFinder } from '../../helper/board';
import { WallPanelControl } from '../../helper';

const XTopPanel = (props) => {
  const PROPS = { ...props };

  const { boardData, currentPlayer, switchQueen, drop, leftWall } = props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const upJumper = 9;
  const jumper = 9;

  const xTopAxis = help.xAxisTop({ ...props, upJumper, takePawn });

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

  const type = helper.queenType(takePawn.type);

  const { illegalWall } = WallPanelControl(boardData);

  const detectMove = xTopAxis
    .filter(
      (el) =>
        el.type && helper.queenType(el.type) !== type && el.id !== takePawn.id
    )
    .map((el) => {
      const id = Number(el.id);

      return illegalWall?.includes(id) ? undefined : id;
    })
    .filter((el) => el);

  const checkMove = detectMove.map((el) => el - jumper);

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
      const type = helper.queenType(el.type);
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

  const move = constants.idGenerator(wallMoves);

  const onlyCorrectMove = constants.motionTransmitter(xTopAxis, takePawn);

  const displayOnlyMove = xTopAxis.filter(
    ({ type, id }) => id !== takePawn.id && type === ''
  );

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id > onlyCorrectMove)
    : displayOnlyMove;

  const moveDisplay = constants.idGenerator(displayMove);

  const detectAttack =
    detectMove.length && correctMoves.length > 1
      ? { data: correctData, jump: true }
      : { data: onlyMove ? move : moveDisplay, jump: false };

  return detectAttack;
};

export default XTopPanel;
