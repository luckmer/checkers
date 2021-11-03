import { GRID_SIZE, BOARD_SIZE } from '../../../constants';
import helper from '../../../constants/helper';

const WallPanelControl = (boardData) => {
  const wall1Pos = 1;
  const wall2Pos = 0;

  const wall1 = helper.wallCreator(
    boardData,
    ({ id }) => id % GRID_SIZE === wall1Pos
  );

  const wall2 = helper.wallCreator(
    boardData,
    ({ id }) => id % GRID_SIZE === wall2Pos
  );

  const leftWall = helper.wallCreator(
    boardData,
    ({ id }) => id % GRID_SIZE === 1
  );
  const rightWall = helper.wallCreator(
    boardData,
    ({ id }) => id % GRID_SIZE === 0
  );

  const blackWall = helper.wallCreator(
    boardData,
    ({ id }) => id > 0 && id <= GRID_SIZE
  );

  const whiteWall = helper.wallCreator(
    boardData,
    ({ id }) => id >= 57 && id <= BOARD_SIZE
  );

  const illegalPosition = [...wall1, ...wall2];

  return { leftWall, rightWall, blackWall, whiteWall, illegalPosition };
};
export default WallPanelControl;
