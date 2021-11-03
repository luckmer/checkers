import { BlockFinder } from '../../helper/board';
import constants from './constants';
import helper from '../data/queenAxisHelper';

const XBottomPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, leftWall } = props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 7;
  const pawnId = takePawn.id;
  const moveAxisA = helper.xAxisBottom({ ...props, takePawn });

  const data = BlockFinder(moveAxisA, currentPlayer, boardData, jumper);
  const equalPlayer = data.filter(({ id }) => id > pawnId);

  const clearMove = constants.equalGenerator(equalPlayer, takePawn);

  const move = equalPlayer.filter(({ id }) => id < clearMove);

  const enemy = [...equalPlayer]
    .filter(({ id }) => leftWall.includes(id))
    .map(({ id }) => id)
    .shift();

  const equal = enemy
    ? equalPlayer.filter(({ id }) => id < enemy)
    : equalPlayer;

  const moves = clearMove ? move : equal;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);
  const JumpsChecker = getPawns.map((index) => index + 7);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter(({ type }) => type)
    .shift()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id < checkJumps - jumper)
    : moves;

  const blockMoveAfterEnemy = constants.moveCutter(correctMove, takePawn);

  const theSamePawn = constants.moveGenerator([...moveAxisA], takePawn);

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id < theSamePawn)
    : correctMove;

  const checkDisplay = constants.typeFilter(correctData);

  const correctBlock = correctData.filter(
    ({ id }) => id <= blockMoveAfterEnemy + jumper
  );

  const displayOnlyMove = constants.typeFinder(moveAxisA, takePawn);

  const onlyCorrectMove = constants.moveGenerator(moveAxisA, takePawn);

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id < onlyCorrectMove)
    : displayOnlyMove;

  const display = constants.idGenerator(displayMove);

  const displayBlock = constants.idGenerator(correctBlock);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export default XBottomPanel;
