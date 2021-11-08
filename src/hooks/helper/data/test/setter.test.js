import Generator from '../../../../service/Generator';
import dataSetter from '../setter';

describe('setter', () => {
  test('should not generate any moves', () => {
    const getNumbers = [];
    const boardData = Generator();
    const jumper = 7;
    const id = 43;
    const currentPlayer = 'white';

    const generateMove = dataSetter({
      getNumbers,
      boardData,
      jumper,
      id,
      currentPlayer
    });

    expect(generateMove).toEqual({ clearBlocker: [] });
  });

  test('should expect different id', () => {
    const getNumbers = [];
    const boardData = Generator();
    const jumper = 7;
    const id = 29;
    const currentPlayer = 'white';

    const generateMove = dataSetter({
      getNumbers,
      boardData,
      jumper,
      id,
      currentPlayer
    });

    expect(generateMove).toEqual({ clearBlocker: [] });
  });
});
