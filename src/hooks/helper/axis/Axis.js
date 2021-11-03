import { direction, upJumper } from '../../../constants';
// import { xCheckTopWhite, xCheckTopBlack, wallCollision } from './constants';
import move from './constants';

const Axis = (props) => {
  const { boardData, takePawn, leftWall, rightWall, currentPlayer } = props;

  const PROPS = { boardData, direction, upJumper, takePawn };

  const XCheckTopWhite = move.xCheckTopWhite({ ...PROPS });

  const XTopWallCollision = move.wallCollision(XCheckTopWhite, leftWall);

  const XTopWall = XCheckTopWhite.filter((el) =>
    !XTopWallCollision ? el : el.id >= XTopWallCollision
  );

  const XCheckTopBlack = move.xCheckTopBlack({ ...PROPS });

  const XBlackWallCollision = move.wallCollision(XCheckTopBlack, rightWall);

  const XBlackWall = XCheckTopBlack.filter((el) =>
    !XBlackWallCollision ? el : el.id <= XBlackWallCollision
  );

  const oneAxis = currentPlayer === 'white' ? XTopWall : XBlackWall;

  return oneAxis;
};

export default Axis;
