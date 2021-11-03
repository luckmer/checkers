import player from './constants';

const SwitchQueen = (props) => {
  const { boardData, takePawn, drop, rightWall, leftWall, clearRoad } = props;
  const { AxisPanel, WallBlockFinder, checker } = player;
  console.log(!takePawn.type.toLowerCase().includes('queen'));

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
