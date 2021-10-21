import { Axis } from "../helper/axis";

import BlockFinder from "../helper/board/blockFinder";
import dataSetter from "../helper/data/setter";
import { WallPanelControl } from "../helper/board/index";
import { yAxisBottom, yAxisTop, xAxisBottom } from "./data/queenAxisHelper";

// type: `${color}Queen, ${takePawn.type}`,
// Img: type === "white" ? WhiteQueen : BlackQueen,
const ControlQueen = (props) => {
  const PROPS = { ...props };

  const XCheckTop = XTopPanel({ ...PROPS }); //!
  const YCheckTop = YTopPanel({ ...PROPS }); //?
  const XCheckBottom = XBottomPanel({ ...PROPS }); //?
  const YCheckBottom = YBottomPanel({ ...PROPS }); //?
  console.log(XCheckTop);

  return {};
};

export default ControlQueen;

const XTopPanel = (props) => {
  const PROPS = { ...props };
  const { currentPlayer, boardData, takePawn } = props;
  const jumper = 9;

  const xTopAxis = Axis({ ...PROPS });
  const moves = xTopAxis.map(({ id }) => id);
  const data = BlockFinder(xTopAxis, currentPlayer, boardData, 9);
  const equalPlayer = data.filter((el) => el.id <= takePawn.id);

  const onlyEmptyJump = equalPlayer
    .filter((el) => el.type === "")
    .map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);

  const { clearBlocker } = dataSetter({ ...PROPS, jumper, getNumbers });

  const id = clearBlocker.shift();
  const ID = xTopAxis
    .filter((el) => el.type && el.type !== takePawn.type)
    .pop().id;

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

  const movesResult = moves.filter((el) => el >= id && el < takePawn.id);
  const moveFail = moves.filter((el) => el > ID && el < takePawn.id);

  const detectAttack =
    detectMove.length && movesResult.length > 1
      ? { data: movesResult, jump: true }
      : { data: moveFail, jump: false };

  return detectAttack;
};

const YTopPanel = (props) => {
  const moveYAxis = yAxisTop(props);

  return moveYAxis;
};

const YBottomPanel = (props) => {
  const moveYAxis = yAxisBottom(props);

  return moveYAxis;
};

const XBottomPanel = (props) => {
  const moveAxisA = xAxisBottom(props);

  return moveAxisA;
};

const typeGenerator = (type) =>
  type.includes("Queen")
    ? type.split(" ")[0].replace(/[,]/g, " ").split(" ").pop()
    : type.split(" ")[0].replace(/[,]/g, "");
