import { WallPanelControl } from "../helper/board/index";
import {
  yAxisBottom,
  yAxisTop,
  xAxisBottom,
  xAxisTop,
} from "./data/queenAxisHelper";

import BlockFinder from "../helper/board/blockFinder";
import dataSetter from "../helper/data/queenSetter";

// type: `${color}Queen, ${takePawn.type}`,
// Img: type === "white" ? WhiteQueen : BlackQueen,

const ControlQueen = (props) => {
  const PROPS = { ...props };

  const XCheckTop = XTopPanel({ ...PROPS }); //!
  const YCheckTop = YTopPanel({ ...PROPS }); //?
  const XCheckBottom = XBottomPanel({ ...PROPS }); //?
  const YCheckBottom = YBottomPanel({ ...PROPS }); //?

  return { XCheckTop };
};

export default ControlQueen;

const YTopPanel = (props) => {
  const moveYAxis = yAxisTop(props);

  console.log(moveYAxis);

  return moveYAxis;
};

const XTopPanel = (props) => {
  const PROPS = { ...props };
  const { takePawn, boardData, currentPlayer } = props;
  const upJumper = 9;
  const jumper = 9;

  const xTopAxis = xAxisTop({ ...PROPS, upJumper });
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

  const checkMove = detectMove.map((el) => el - 9);

  const checkPossibleJump = boardData
    .filter((el) => checkMove.includes(el.id))
    .filter((el) => el.type);

  const jumpBlocker = checkPossibleJump ? checkPossibleJump.pop() : undefined;

  const movesResult = moves.filter((el) => el >= id && el < takePawn.id);

  const moveFail = moves.filter((el) => el > ID && el < takePawn.id);

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

  const detectAttack =
    detectMove.length && correctMoves.length > 1
      ? { data: correctData, jump: true }
      : { data: moveFail, jump: false };

  return detectAttack;
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
