import boardMap from '../Board';
import helper from '../../constants/helper';
import Generator from '../../service/Generator';

describe('Board', () => {
  test('should be equal to 64', () => {
    expect(boardMap).toHaveLength(64);
  });

  test('should contain twelve white pawns', () => {
    const board = Generator();

    const whitePawn = board
      .filter(({ type }) => helper.queenType(type) === 'white')
      .map(({ id }) => id);

    expect(whitePawn).toHaveLength(12);
  });

  test('should contain twelve black pawns', () => {
    const board = Generator();

    const blackPawn = board
      .filter(({ type }) => helper.queenType(type) === 'black')
      .map(({ id }) => id);

    expect(blackPawn).toHaveLength(12);
  });
});
