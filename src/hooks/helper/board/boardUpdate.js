import { whiteAxis, blackAxis, values } from '../../../constants/helper';

const BoardUpdate = (props) => {
  const { oneYAxis, oneAxis, takePawn, drop, currentPlayer, boardData } = props;

  const pawn = takePawn.id;
  const jump = drop;

  const clearX = values(oneYAxis);
  const clearY = values(oneAxis);

  const blackX = blackAxis(clearX, pawn, jump);
  const blackY = blackAxis(clearY, pawn, jump);
  const whiteX = whiteAxis(clearX, pawn, jump);
  const whiteY = whiteAxis(clearY, pawn, jump);

  const switchX = currentPlayer === 'white' ? whiteX : blackX;
  const switchY = currentPlayer === 'white' ? whiteY : blackY;

  const XJump = clearX.includes(jump) ? switchX : undefined;
  const YJump = clearY.includes(jump) ? switchY : undefined;

  const update = boardData.map((el) => {
    const ids = Number(el.id);

    if (ids === Number(drop)) {
      return { ...el, Img: takePawn.Img, type: takePawn.type };
    }

    if (
      (XJump && XJump.includes(ids)) ||
      (YJump && YJump.includes(ids)) ||
      ids === Number(takePawn.id)
    ) {
      return { ...el, Img: 'Empty', type: '' };
    }

    return el;
  });

  return update;
};

export default BoardUpdate;
