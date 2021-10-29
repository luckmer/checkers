import { direction, upJumper } from '../../../constants';
import { xCheckTopWhite, xCheckTopBlack, wallCollision } from './constants';

const Axis = (props) => {
  const { boardData, takePawn, leftWall, rightWall, currentPlayer } = props;

  const PROPS = { boardData, direction, upJumper, takePawn };

  const XCheckTopWhite = xCheckTopWhite({ ...PROPS });

  const XTopWallCollision = wallCollision(XCheckTopWhite, leftWall);

  const XTopWall = XCheckTopWhite.filter((el) =>
    !XTopWallCollision ? el : el.id >= XTopWallCollision
  );

  const XCheckTopBlack = xCheckTopBlack({ ...PROPS });

  const XBlackWallCollision = wallCollision(XCheckTopBlack, rightWall);

  const XBlackWall = XCheckTopBlack.filter((el) =>
    !XBlackWallCollision ? el : el.id <= XBlackWallCollision
  );

  const oneAxis = currentPlayer === 'white' ? XTopWall : XBlackWall;

  return oneAxis;
};

export default Axis;
