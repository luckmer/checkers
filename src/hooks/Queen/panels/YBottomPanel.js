import { BlockFinder } from '../../helper/board';
import constants from './constants';
import helper from '../data/queenAxisHelper';

const YBottomPanel = (props) => {
  const { boardData, currentPlayer, switchQueen, drop, rightWall } = props;

  const takePawn = switchQueen
    ? {
        ...props.takePawn,
        id: drop,
        _id: drop
      }
    : props.takePawn;

  const jumper = 9;

  const YAxis = helper.yAxisBottom({ ...props, takePawn });
  const data = BlockFinder(YAxis, currentPlayer, boardData, jumper);

  const equalPlayer = data.filter((el) => el.id > takePawn.id);

  const clearMove = constants.equalGenerator(equalPlayer, takePawn);

  const move = equalPlayer.filter(({ id }) => id < clearMove);

  const enemy = [...equalPlayer]
    .filter(({ id }) => rightWall.includes(id))
    .map(({ id }) => id)
    .shift();

  const equal = enemy
    ? equalPlayer.filter(({ id }) => id < enemy)
    : equalPlayer;

  const moves = clearMove ? move : equal;

  const getPawns = moves.filter(({ type }) => type).map(({ id }) => id);

  const JumpsChecker = getPawns.map((el) => el + jumper);

  const checkJumps = boardData
    .filter(({ id }) => JumpsChecker.includes(id))
    .filter((el) => el.type)
    .shift()?.id;

  const correctMove = checkJumps
    ? moves.filter(({ id }) => id < checkJumps - 9)
    : moves;

  const theSamePawn = constants.moveGenerator([...YAxis], takePawn);

  const onlyCorrectMove = constants.motionTransmitter(YAxis, takePawn);

  const displayOnlyMove = YAxis.filter(
    ({ type, id }) => id !== takePawn.id && type === ''
  );

  const displayMove = onlyCorrectMove
    ? displayOnlyMove.filter(({ id }) => id < onlyCorrectMove)
    : displayOnlyMove;

  const blockMoveAfterEnemy = constants.moveCutter(correctMove, takePawn);

  const correctData = theSamePawn
    ? correctMove.filter(({ id }) => id > takePawn.id && id < theSamePawn)
    : correctMove;

  const correctBlock = correctData.filter(
    ({ id }) => id <= blockMoveAfterEnemy + jumper
  );

  const checkDisplay = constants.typeFilter(correctData);

  const display = constants.idGenerator(displayMove);
  const displayBlock = constants.idGenerator(correctBlock);

  const detectAttack = !checkDisplay
    ? { data: displayBlock, jump: true }
    : { data: display, jump: false };

  return detectAttack;
};

export default YBottomPanel;
