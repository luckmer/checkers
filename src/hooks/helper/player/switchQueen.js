import {
  XBottomPanel,
  XTopPanel,
  YBottomPanel,
  YTopPanel
} from '../../Queen/ControlQueen';

const generateMove = (arr, element) =>
  arr.filter(({ id }) => element.includes(id)).map(({ type }) => type);

const checker = (arr) => arr.includes('');

const switchQueen = (props) => {
  const { boardData, takePawn } = props;

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

export default switchQueen;
