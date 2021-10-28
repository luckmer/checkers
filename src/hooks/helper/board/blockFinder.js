import { combineArray } from '../../../constants/helper';

const BlockFinder = (oneAxis, currentPlayer, boardData, direction) => {
  const blackBlocks = oneAxis
    .filter((el) => {
      const Player = el.type.split(' ')[0].replace(/[,]/g, '');

      return Player !== currentPlayer;
    })
    .filter((el) => el.type)
    .map(({ id }) => id);

  const higher = blackBlocks.map((el) => [el - direction, el, el + direction]);
  const smaller = blackBlocks.map((el) => [el + direction, el, el - direction]);

  const findEmptySpace = [...new Set(combineArray([...higher, ...smaller]))];

  const data = boardData.filter((el) => findEmptySpace.includes(el.id));

  return data;
};
export default BlockFinder;
