import {
  XBottomPanel,
  XTopPanel,
  YBottomPanel,
  YTopPanel
} from '../../Queen/panels/index';

class Player {
  generateMove = (arr, element) =>
    arr.filter(({ id }) => element.includes(id)).map(({ type }) => type);

  checker = (arr) => arr.includes('');

  WallBlockFinder = (findWallBlocks, boardData) => {
    const wallBlocks = findWallBlocks.filter((el) => el);

    const getBlocks = boardData
      .filter(({ type }) => wallBlocks.includes(type))
      .map(({ id }) => id);

    return getBlocks;
  };

  AxisPanel = (props, switchQueen, boardData) => {
    const Xbottom = XBottomPanel({ ...props, switchQueen });
    const Ytop = YTopPanel({ ...props, switchQueen });
    const Ybottom = YBottomPanel({ ...props, switchQueen });
    const Xtop = XTopPanel({ ...props, switchQueen });

    const xBottomAxis = this.generateMove(boardData, Xbottom.data);
    const yBottomAxis = this.generateMove(boardData, Ybottom.data);
    const xTopAxis = this.generateMove(boardData, Xtop.data);
    const yTopAxis = this.generateMove(boardData, Ytop.data);

    return { xBottomAxis, yBottomAxis, xTopAxis, yTopAxis };
  };
}

const player = new Player();

export default player;
