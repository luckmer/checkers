import YAxis from '../YAxis';
import Generator from '../../../../service/Generator';

describe('YAxis', () => {
  test('should', () => {
    const boardData = Generator();
    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const leftWall = [1, 9, 17, 25, 33, 41, 49, 57];
    const rightWall = [8, 16, 24, 32, 40, 48, 56, 64];

    const currentPlayer = 'white';

    const generate = YAxis({
      boardData,
      takePawn,
      rightWall,
      leftWall,
      currentPlayer
    });

    const moves = {
      switchCleaner: 8,
      properties: [
        { id: 1, _id: 1, background: 0, Img: 'Empty', type: '' },
        {
          id: 8,
          _id: 8,
          background: 1,
          Img: 'black.png',
          type: 'black, 21'
        },
        {
          id: 15,
          _id: 15,
          background: 1,
          Img: 'black.png',
          type: 'black, 17'
        },
        {
          id: 22,
          _id: 22,
          background: 1,
          Img: 'black.png',
          type: 'black, 14'
        },
        { id: 29, _id: 29, background: 1, Img: 'Empty', type: '' }
      ],
      oneYAxis: [
        {
          id: 8,
          _id: 8,
          background: 1,
          Img: 'black.png',
          type: 'black, 21'
        },
        {
          id: 15,
          _id: 15,
          background: 1,
          Img: 'black.png',
          type: 'black, 17'
        },
        {
          id: 22,
          _id: 22,
          background: 1,
          Img: 'black.png',
          type: 'black, 14'
        },
        { id: 29, _id: 29, background: 1, Img: 'Empty', type: '' },
        { id: 36, _id: 36, background: 1, Img: 'Empty', type: '' },
        {
          id: 43,
          _id: 43,
          background: 1,
          Img: 'white.png',
          type: 'white, 2'
        }
      ]
    };

    expect(generate).toEqual(moves);
  });
});
