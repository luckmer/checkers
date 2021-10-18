import { wallCreator } from "../../../constants/helper";

const WallPanelControl = (boardData) => {
  const wall1Pos = 1;
  const wall2Pos = 0;

  const wall1 = wallCreator(boardData, (item) => item.id % 8 === wall1Pos);

  const wall2 = wallCreator(boardData, (item) => item.id % 8 === wall2Pos);

  const illegalPosition = [...wall1, ...wall2];

  return illegalPosition;
};
export default WallPanelControl;
