import { Axis } from "../helper/axis";
import BlockFinder from "../helper/board/blockFinder";
import dataSetter from "../helper/data/setter";
import IdGetter from "../helper/data/IdGetter";

const ControlLeftSite = (props) => {
  const PROPS = { ...props };
  const { currentPlayer, boardData, move, leftWall, rightWall, drop } = PROPS;

  const oneAxis = Axis({ ...PROPS });

  const data = BlockFinder(oneAxis, currentPlayer, boardData, 9);

  const onlyEmptyJump = data.filter((el) => el.type === "").map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);

  const jumper = 9;

  const { clearBlocker } = dataSetter({ ...PROPS, jumper, getNumbers });

  const axisXValues = oneAxis.map(({ id }) => id);

  const PossibleAttackId = IdGetter({ ...PROPS, axisXValues });

  const PossibleBefore =
    PossibleAttackId && currentPlayer === "white"
      ? PossibleAttackId - 9
      : PossibleAttackId + 9;

  const IllegalAttack =
    leftWall.includes(PossibleAttackId) || rightWall.includes(PossibleAttackId);

  const checkPossibleBlock =
    PossibleBefore > 0 || !isNaN(PossibleBefore)
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const correctLeftMove = !checkPossibleBlock
    ? false
    : checkPossibleBlock.type === "";

  const detectAttack =
    correctLeftMove && !IllegalAttack
      ? { data: clearBlocker, jump: true }
      : { data: move, jump: false };

  return { detectAttack, correctLeftMove, oneAxis };
};

export default ControlLeftSite;
