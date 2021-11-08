import WallPanelControl from '../WallPanelControll';
import Generate from '../../../../service/Generator';

describe('Wall panell controll', () => {
  test('should generate few options for walls', () => {
    const boardData = Generate();

    const { leftWall, rightWall, blackWall, whiteWall, illegalPosition } =
      WallPanelControl(boardData);

    expect(leftWall).toEqual([1, 9, 17, 25, 33, 41, 49, 57]);
    expect(rightWall).toEqual([8, 16, 24, 32, 40, 48, 56, 64]);
    expect(blackWall).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(whiteWall).toEqual([57, 58, 59, 60, 61, 62, 63, 64]);
    expect(illegalPosition).toEqual([
      1, 9, 17, 25, 33, 41, 49, 57, 8, 16, 24, 32, 40, 48, 56, 64
    ]);
  });
});
