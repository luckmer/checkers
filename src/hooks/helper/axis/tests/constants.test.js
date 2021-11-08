import Generator from '../../../../service/Generator';
import move from '../constants';

describe('constants', () => {
  test('xCheckTopBlack should generate moves for black players', () => {
    const boardData = Generator();
    const direction = -1;
    const upJumper = 9;

    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const props = { boardData, direction, upJumper, takePawn };
    const generate = move.xCheckTopBlack({ ...props });

    const moves = [
      {
        id: 43,
        _id: 43,
        background: 1,
        Img: 'white.png',
        type: 'white, 2'
      },
      {
        id: 52,
        _id: 52,
        background: 1,
        Img: 'white.png',
        type: 'white, 6'
      },
      {
        id: 61,
        _id: 61,
        background: 1,
        Img: 'white.png',
        type: 'white, 11'
      }
    ];

    expect(generate).toEqual(moves);
  });

  test('xCheckTopWhite should generate moves for white players', () => {
    const boardData = Generator();
    const direction = -1;
    const upJumper = 9;

    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const props = { boardData, direction, upJumper, takePawn };
    const generate = move.xCheckTopWhite({ ...props });

    const moves = [
      { id: 7, _id: 7, background: 0, Img: 'Empty', type: '' },
      { id: 16, _id: 16, background: 0, Img: 'Empty', type: '' },
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

  test('yCheckTopBlack should generate moves for black players', () => {
    const boardData = Generator();
    const direction = -1;
    const upJumper = 9;

    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const props = { boardData, direction, upJumper, takePawn };
    const generate = move.yCheckTopBlack({ ...props });

    const moves = [];

    expect(generate).toEqual(moves);
  });

  test('each move should expect different jumper', () => {
    const boardData = Generator();
    const direction = -1;
    const upJumper = 7;

    const takePawn = {
      id: 43,
      _id: 43,
      background: 1,
      Img: '',
      type: 'white, 2'
    };

    const props = { boardData, direction, upJumper, takePawn };
    const generate = move.xCheckTopWhite({ ...props });

    const moves = [
      { id: 1, _id: 1, background: 0, Img: 'Empty', type: '' },
      { id: 8, _id: 8, background: 1, Img: 'black.png', type: 'black, 21' },
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
    ];

    expect(generate).toEqual(moves);
  });

  test('should detect wall collision if player is nearby', () => {
    const rightWall = [8, 16, 24, 32, 40, 48, 56, 64];
    const arr = Generator();

    const detect = move.wallCollision(arr, rightWall);

    expect(detect).toBe(8);
  });
});
