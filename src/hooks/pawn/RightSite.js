import IdGetter from "../helper/data/IdGetter";
import { YAxis } from "../helper/axis";
import dataSetter from "../helper/data/setter";

const ControlRightSite = ({
  boardData,
  takePawn,
  rightWall,
  leftWall,
  currentPlayer,
  id,
  move,
  pawnType,
  drop,
}) => {
  const { switchCleaner, properties, oneYAxis } = YAxis(
    boardData,
    takePawn,
    rightWall,
    leftWall,
    currentPlayer
  );

  const data = switchCleaner
    ? properties.filter((el) =>
        currentPlayer === "white"
          ? el.id >= switchCleaner
          : el.id <= switchCleaner
      )
    : properties;

  const onlyEmptyJump = data.filter((el) => el.type === "").map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);

  const jumper = 7;

  const { clearBlocker } = dataSetter({
    getNumbers,
    currentPlayer,
    boardData,
    jumper,
    id,
  });

  const axisXValues = oneYAxis.map(({ id }) => id);

  const PossibleAttackId = IdGetter(boardData, move, pawnType, axisXValues);

  const PossibleBefore =
    PossibleAttackId && currentPlayer === "white"
      ? PossibleAttackId - 7
      : PossibleAttackId + 7;

  const switchWallDetector =
    drop % 8 === 1
      ? rightWall.includes(PossibleBefore)
      : leftWall.includes(PossibleBefore);

  const checkPossibleBlock =
    PossibleBefore && !switchWallDetector
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const CorrectRightMove = !checkPossibleBlock
    ? false
    : checkPossibleBlock.type === "";

  const test = CorrectRightMove
    ? {
        data: clearBlocker,
        jump: true,
      }
    : {
        data: move,
        jump: false,
      };

  return { test, CorrectRightMove, oneYAxis };
};

export default ControlRightSite;
