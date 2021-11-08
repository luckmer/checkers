import dropPanel from '../dropPanel';
import Generator from '../../../../service/Generator';

describe('dropPanel', () => {
  test('should generate possible walls based on queen drop moves', () => {
    const boardData = Generator();
    const dropPosition = [29, 22, 15];
    const currentPlayer = 'white';

    const { rightWall, leftWall, IncreaseDrop } = dropPanel(
      boardData,
      dropPosition,
      currentPlayer
    );

    expect(rightWall).toEqual([8, 16, 24, 32, 40, 48, 56, 64]);
    expect(leftWall).toEqual([1, 9, 17, 25, 33, 41, 49, 57]);
    expect(IncreaseDrop).toEqual([20, 15, 8]);
  });

  test('should expect different locations', () => {
    const boardData = Generator();
    const dropPosition = [27, 18, 9];
    const currentPlayer = 'white';

    const { rightWall, leftWall, IncreaseDrop } = dropPanel(
      boardData,
      dropPosition,
      currentPlayer
    );

    expect(rightWall).toEqual([8, 16, 24, 32, 40, 48, 56, 64]);
    expect(leftWall).toEqual([1, 9, 17, 25, 33, 41, 49, 57]);
    expect(IncreaseDrop).toEqual([18, 11, undefined]);
  });
});
