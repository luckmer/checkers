import { wallCreator } from '../../../constants/helper';

const WallPanelControl = (boardData) => {
  const wall1Pos = 1;
  const wall2Pos = 0;

  const wall1 = wallCreator(boardData, (item) => item.id % 8 === wall1Pos);

  const wall2 = wallCreator(boardData, (item) => item.id % 8 === wall2Pos);

  const leftWall = wallCreator(boardData, ({ id }) => id % 8 === 1);
  const rightWall = wallCreator(boardData, ({ id }) => id % 8 === 0);
  const blackWall = wallCreator(boardData, ({ id }) => id > 0 && id <= 8);
  const whiteWall = wallCreator(boardData, ({ id }) => id >= 57 && id <= 64);

  const illegalPosition = [...wall1, ...wall2];

  return { leftWall, rightWall, blackWall, whiteWall, illegalPosition };
};
export default WallPanelControl;
