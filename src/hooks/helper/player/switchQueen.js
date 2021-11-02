import {
  XBottomPanel,
  XTopPanel,
  YBottomPanel,
  YTopPanel
} from '../../Queen/ControlQueen';

const SwitchQueen = (props) => {
  const { boardData, takePawn, drop, rightWall, leftWall, clearRoad } = props;

  if (!takePawn.type.toLowerCase().includes('queen')) return;

  const switchQueen = true;

  const { xBottomAxis, yBottomAxis, xTopAxis, yTopAxis } = AxisPanel(
    props,
    switchQueen,
    boardData
  );

  const noMoves = [...xBottomAxis, ...yBottomAxis, ...xTopAxis, ...yTopAxis];

  const movesResult = noMoves.filter((el) => el);

  const roadAxis = clearRoad.axis;
  const getRoad = boardData.filter(({ id }) => clearRoad.data.includes(id));

  const emptyMove = getRoad
    .filter(({ id }) => {
      return roadAxis === 'more'
        ? id > drop && id < takePawn.id
        : id < drop && id > takePawn.id;
    })
    .filter(({ type }) => type)
    .map(({ type }) => type);

  if (!movesResult.length || !emptyMove.length || !getRoad.length) return false;

  if (drop % 8 === 2) {
    const getBlocks = WallBlockFinder(noMoves, boardData);

    const leftIncludes = leftWall.some((el) => getBlocks.includes(el));

    if (leftIncludes) return false;
  }

  if (drop % 8 === 7) {
    const getBlocks = WallBlockFinder(noMoves, boardData);

    const rightIncludes = rightWall.some((el) => getBlocks.includes(el));

    if (rightIncludes) return false;
  }

  if (xBottomAxis || yBottomAxis || xTopAxis || yTopAxis) {
    return checker(xBottomAxis) ||
      checker(yBottomAxis) ||
      checker(xTopAxis) ||
      checker(yTopAxis)
      ? true
      : false;
  }

  return false;
};

export default SwitchQueen;

const generateMove = (arr, element) =>
  arr.filter(({ id }) => element.includes(id)).map(({ type }) => type);

const checker = (arr) => arr.includes('');

const WallBlockFinder = (findWallBlocks, boardData) => {
  const wallBlocks = findWallBlocks.filter((el) => el);

  const getBlocks = boardData
    .filter(({ type }) => wallBlocks.includes(type))
    .map(({ id }) => id);

  return getBlocks;
};

const AxisPanel = (props, switchQueen, boardData) => {
  const Xbottom = XBottomPanel({ ...props, switchQueen });
  const Ytop = YTopPanel({ ...props, switchQueen });
  const Ybottom = YBottomPanel({ ...props, switchQueen });
  const Xtop = XTopPanel({ ...props, switchQueen });

  const xBottomAxis = generateMove(boardData, Xbottom.data);
  const yBottomAxis = generateMove(boardData, Ybottom.data);
  const xTopAxis = generateMove(boardData, Xtop.data);
  const yTopAxis = generateMove(boardData, Ytop.data);
  return { xBottomAxis, yBottomAxis, xTopAxis, yTopAxis };
};
