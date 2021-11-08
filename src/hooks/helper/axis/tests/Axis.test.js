import Axis from '../Axis';
import Generator from '../../../../service/Generator';

const Helper = () => {
  const boardData = Generator();

  const leftWall = [1, 9, 17, 25, 33, 41, 49, 57];
  const rightWall = [8, 16, 24, 32, 40, 48, 56, 64];

  return { boardData, leftWall, rightWall };
};

describe('Axis', () => {
  test('should genereate simple one A axis', () => {
    const { boardData, leftWall, rightWall } = Helper();

    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const currentPlayer = 'white';

    const generate = Axis({
      boardData,
      takePawn,
      leftWall,
      rightWall,
      currentPlayer
    });

    const moves = [
      { id: 25, _id: 25, background: 1, Img: 'Empty', type: '' },
      { id: 34, _id: 34, background: 1, Img: 'Empty', type: '' },
      {
        id: 43,
        _id: 43,
        background: 1,
        Img: 'white.png',
        type: 'white, 2'
      }
    ];
    expect(generate).toEqual(moves);
  });

  test('should expect different axis', () => {
    const { boardData, leftWall, rightWall } = Helper();
    const takePawn = {
      id: 9,
      _id: 9,
      background: 1,
      Img: '',
      type: 'black, 20'
    };

    const currentPlayer = 'black';

    const generate = Axis({
      boardData,
      takePawn,
      leftWall,
      rightWall,
      currentPlayer
    });

    const moves = [
      { id: 9, _id: 9, background: 1, Img: 'black.png', type: 'black, 20' },
      {
        id: 18,
        _id: 18,
        background: 1,
        Img: 'black.png',
        type: 'black, 16'
      },
      { id: 27, _id: 27, background: 1, Img: 'Empty', type: '' },
      { id: 36, _id: 36, background: 1, Img: 'Empty', type: '' },
      {
        id: 45,
        _id: 45,
        background: 1,
        Img: 'white.png',
        type: 'white, 3'
      },
      {
        id: 54,
        _id: 54,
        background: 1,
        Img: 'white.png',
        type: 'white, 7'
      },
      {
        id: 63,
        _id: 63,
        background: 1,
        Img: 'white.png',
        type: 'white, 12'
      }
    ];

    expect(generate).toEqual(moves);
  });
});
