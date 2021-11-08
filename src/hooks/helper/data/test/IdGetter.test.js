import IdGetter from '../IdGetter';
import Generator from '../../../../service/Generator';

describe('IdGetter', () => {
  test('should generate possbile attack', () => {
    const boardData = Generator();
    const move = [34, 36];
    const pawnType = 'white';
    const axisXValues = [8, 15, 22, 29, 36, 43];

    const generate = IdGetter({ boardData, move, pawnType, axisXValues });

    expect(generate).toBe(undefined);
  });

  test('should expect different location', () => {
    const boardData = Generator();
    const move = [27, 29];
    const pawnType = 'white';
    const axisXValues = [8, 15, 22, 29, 36, 43];

    const generate = IdGetter({ boardData, move, pawnType, axisXValues });

    expect(generate).toBe(undefined);
  });
});
