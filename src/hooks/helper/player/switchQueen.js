import {
  XBottomPanel,
  XTopPanel,
  YBottomPanel,
  YTopPanel
} from '../../Queen/ControlQueen';

const generateMove = (arr, element) =>
  arr.filter(({ id }) => element.includes(id)).map(({ type }) => type);

const checker = (arr) => arr.includes('');

const SwitchQueen = (props) => {
  const { boardData, takePawn, drop, rightWall, leftWall } = props;

  if (!takePawn.type.toLowerCase().includes('queen')) return;

  const switchQueen = true;

  const Xbottom = XBottomPanel({ ...props, switchQueen });
  const Ytop = YTopPanel({ ...props, switchQueen });
  const Ybottom = YBottomPanel({ ...props, switchQueen });
  const Xtop = XTopPanel({ ...props, switchQueen });

  const xBottomAxis = generateMove(boardData, Xbottom.data);
  const yBottomAxis = generateMove(boardData, Ybottom.data);
  const xTopAxis = generateMove(boardData, Xtop.data);
  const yTopAxis = generateMove(boardData, Ytop.data);

  const noMoves = [
    ...xBottomAxis,
    ...yBottomAxis,
    ...xTopAxis,
    ...yTopAxis
  ].filter((el) => el);

  if (!noMoves.length) return false;

  const findWallBlocks = [
    ...xBottomAxis,
    ...yBottomAxis,
    ...xTopAxis,
    ...yTopAxis
  ];

  if (drop % 8 === 2) {
    const getBlocks = WallBlockFinder(findWallBlocks, boardData);

    const leftIncludes = leftWall.some((el) => getBlocks.includes(el));

    if (leftIncludes) return false;
  }

  if (drop % 8 === 7) {
    const getBlocks = WallBlockFinder(findWallBlocks, boardData);

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

const WallBlockFinder = (findWallBlocks, boardData) => {
  const wallBlocks = findWallBlocks.filter((el) => el);

  const getBlocks = boardData
    .filter(({ type }) => wallBlocks.includes(type))
    .map(({ id }) => id);

  return getBlocks;
};
