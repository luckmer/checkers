import Generator from '../../../../service/Generator';
import player from '../constants';

describe('Constants', () => {
  test('should generate move', () => {
    const arr = Generator();
    const element = [27, 18, 9, 36];

    const moves = player.generateMove(arr, element);

    const movesResult = ['black, 20', 'black, 16', '', ''];

    expect(moves).toEqual(movesResult);
  });

  test('should expect different position', () => {
    const arr = Generator();
    const element = [34, 27, 20, 13, 6];

    const moves = player.generateMove(arr, element);

    const movesResult = ['black, 22', 'black, 18', 'black, 15', '', ''];

    expect(moves).toEqual(movesResult);
  });

  test('should find empty spaces', () => {
    const movesResult = ['black, 22', 'black, 18', 'black, 15', '', ''];

    const find = player.checker(movesResult);

    expect(find).toBe(true);
  });

  test('should find empty spaces based on different position', () => {
    const movesResult = ['black, 20', 'black, 16', '', ''];

    const find = player.checker(movesResult);

    expect(find).toBe(true);
  });

  test('expect no empty spaces', () => {
    const movesResult = ['black, 20', 'black, 16'];

    const find = player.checker(movesResult);

    expect(find).toBe(false);
  });
});
