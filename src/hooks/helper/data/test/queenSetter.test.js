import dataSetter from '../queenSetter';
import Generator from '../../../../service/Generator';

describe('queen setter', () => {
  test('should', () => {
    const getNumbers = [27];
    const boardData = Generator();
    const jumper = 9;

    const queenMoves = dataSetter({ getNumbers, boardData, jumper });

    expect(queenMoves).toEqual({ JumpMove: [undefined] });
  });
});
