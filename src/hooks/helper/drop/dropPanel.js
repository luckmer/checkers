import { WallPanelControl } from '../board/index';

const dropPanel = (boardData, dropPosition, currentPlayer) => {
  const { leftWall, rightWall } = WallPanelControl(boardData);

  const IncreaseWhite = dropPosition.map((el, index) => {
    if (rightWall.includes(el) || leftWall.includes(el)) return undefined;

    const jumpX = 9;
    const jumpY = 7;

    if (index === 0 && currentPlayer === 'white') {
      return el - jumpX;
    }
    return el - jumpY;
  });

  const increaseBlack = dropPosition.map((el, index) => {
    if (rightWall.includes(el) || leftWall.includes(el)) return undefined;
    const jumpX = 9,
      jumpY = 7;

    return index === 1 ? el + jumpX : el + jumpY;
  });

  const IncreaseDrop =
    currentPlayer === 'white' ? IncreaseWhite : increaseBlack;

  return { rightWall, leftWall, IncreaseDrop };
};

export default dropPanel;
