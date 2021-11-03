import { BlockFinder } from '../../helper/board';
import constants from './constants';
import helper from '../data/queenAxisHelper';

const YTopPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, rightWall } = props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 7;
  const pawnId = takePawn.id;
  const YAxis = helper.yAxisTop({ ...props, takePawn });
  const data = BlockFinder(YAxis, currentPlayer, boardData, jumper);
  const equalPlayer = data.filter(({ id }) => id < pawnId);

  const clearMove = constants.equalTopGenerator(equalPlayer, takePawn);

  const move = equalPlayer.filter(({ id }) => id > clearMove);

  const enemy = [...equalPlayer]
    .filter(({ id }) => rightWall.includes(id))
    .map(({ id }) => id)
    .shift();

  const equal = enemy
    ? equalPlayer.filter(({ id }) => id > enemy)
    : equalPlayer;

  const moves = clearMove ? move : equal;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);
  const JumpsChecker = getPawns.map((el) => el - jumper);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter(({ type }) => type)
    .pop()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id > checkJumps + jumper)
    : moves;

  const theSamePawn = constants.moveTopGenerator(YAxis, takePawn);

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id > theSamePawn)
    : correctMove;

  const blockMoveAfterEnemy = constants.moveTopCutter(correctMove, takePawn);

  const correctBlock = correctData.filter(
    ({ id }) => id >= blockMoveAfterEnemy - jumper
  );

  const checkDisplay = correctData
    .map(({ type }) => type)
    .every((index) => index === '');

  const onlyCorrectMove = constants.moveTopGenerator(YAxis, takePawn);

  const displayOnlyMove = YAxis.filter(({ id }) => id !== takePawn.id);

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id > onlyCorrectMove)
    : displayOnlyMove;

  const display = idGenerator(displayMove);
  const displayBlock = idGenerator(correctBlock);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export default YTopPanel;

const idGenerator = (displayMove) => displayMove.map(({ id }) => id);
