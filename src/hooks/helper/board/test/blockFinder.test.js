import BlockFinder from '../blockFinder';
import Generate from '../../../../service/Generator';

describe('BlockFinder', () => {
  test('should return enemy block', () => {
    const { oneAxis, boardData, direction } = Helper();
    const currentPlayer = 'white';

    const enemy = BlockFinder(oneAxis, currentPlayer, boardData, direction);
    const possibleMove = [
      { id: 1, _id: 1, background: 0, Img: 'Empty', type: '' },
      { id: 8, _id: 8, background: 1, Img: 'black.png', type: 'black, 21' },
      { id: 15, _id: 15, background: 1, Img: 'black.png', type: 'black, 17' },
      { id: 22, _id: 22, background: 1, Img: 'black.png', type: 'black, 14' },
      { id: 29, _id: 29, background: 1, Img: 'Empty', type: '' }
    ];

    expect(enemy).toEqual(possibleMove);
  });

  test('should expect different player', () => {
    const { oneAxis, boardData, direction } = Helper();
    const currentPlayer = 'black';

    const enemy = BlockFinder(oneAxis, currentPlayer, boardData, direction);
    const possibleMove = [
      { id: 36, _id: 36, background: 1, Img: 'Empty', type: '' },
      { id: 43, _id: 43, background: 1, Img: 'white.png', type: 'white, 2' },
      { id: 50, _id: 50, background: 1, Img: 'white.png', type: 'white, 5' }
    ];

    expect(enemy).toEqual(possibleMove);
  });
});

const Helper = () => {
  const boardData = Generate();
  const oneAxis = [
    { id: 8, _id: 8, background: 1, Img: '', type: 'black, 21' },
    { id: 15, _id: 15, background: 1, Img: '', type: 'black, 17' },
    { id: 22, _id: 22, background: 1, Img: '', type: 'black, 14' },
    { id: 29, _id: 29, background: 1, Img: 'Empty', type: '' },
    { id: 36, _id: 36, background: 1, Img: 'Empty', type: '' },
    { id: 43, _id: 43, background: 1, Img: '', type: 'white, 2' }
  ];
  const direction = 7;
  return { oneAxis, boardData, direction };
};
