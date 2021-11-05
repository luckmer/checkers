import helper from '../helper';
import Generator from '../../service/Generator';

describe('helper', () => {
  test('should generate left wall', () => {
    const data = Generator();

    const leftWall = helper.wallCreator(data, ({ id }) => id % 8 === 1);

    const left = [1, 9, 17, 25, 33, 41, 49, 57];

    expect(leftWall).toEqual(left);
  });

  test('should generate right wall', () => {
    const data = Generator();

    const rightWall = helper.wallCreator(data, ({ id }) => id % 8 === 0);

    const right = [8, 16, 24, 32, 40, 48, 56, 64];

    expect(rightWall).toEqual(right);
  });

  test('should find element by id', () => {
    const data = Generator();
    const pos = 32;

    const result = helper.find(data, pos);

    const findResult = {
      id: 32,
      _id: 32,
      background: 0,
      Img: 'Empty',
      type: ''
    };

    expect(result).toEqual(findResult);
  });

  test('should find element by different ids', () => {
    const data = Generator();
    const pos = 30;

    const result = helper.find(data, pos);

    const findResult = {
      id: 30,
      _id: 30,
      background: 0,
      Img: 'Empty',
      type: ''
    };

    expect(result).toEqual(findResult);
  });

  test('should find element by uniqe filter', () => {
    const data = Generator();
    const finder = (element) => element.id > 0 && element.id <= 3;

    const result = helper.dataFinder(data, finder);

    const findResult = { id: 1, _id: 1, background: 0, Img: 'Empty', type: '' };

    expect(result).toEqual(findResult);
  });

  test('should get array edges by start and end options', () => {
    const data = Generator();
    const start = 20;
    const end = 25;

    const finder = helper.getArrayEdges(data, start, end);
    const findResult = [20, 21, 22, 23, 24, 25];
    expect(finder).toEqual(findResult);
  });

  test('length can by equal 0', () => {
    const data = Generator();
    const start = 20;
    const end = 19;

    const finder = helper.getArrayEdges(data, start, end);
    const findResult = [];
    expect(finder).toEqual(findResult);
  });

  test('length can by equal 1', () => {
    const data = Generator();
    const start = 20;
    const end = 20;

    const finder = helper.getArrayEdges(data, start, end);
    const findResult = [20];
    expect(finder).toEqual(findResult);
  });

  test('should return ids', () => {
    const data = Generator();
    const ids = helper.values(data);
    const result = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59, 60, 61, 62, 63, 64
    ];

    expect(ids).toEqual(result);
  });

  test('should return blocks from the oposite axes', () => {
    const data = [13, 20, 27, 34, 41];
    const pawn = 20;
    const jump = 34;

    const blockA = helper.blackAxis(data, pawn, jump);

    expect(blockA).toEqual([27]);
  });

  test('should return blocks from the white axis', () => {
    const data = [6, 13, 20, 27, 34, 41];
    const pawn = 20;
    const jump = 6;

    const blockA = helper.whiteAxis(data, pawn, jump);

    expect(blockA).toEqual([13]);
  });

  test('should return first element from array', () => {
    const data = Generator();
    const finder = (element) => element.id > 0 && element.id <= 3;

    const blockA = helper.wallDetector(data, finder);

    expect(blockA).toBe(1);
  });

  test('should return original pawn type', () => {
    const pawnType = 'black, 23';

    const convert = helper.pawnType(pawnType);

    expect(convert).toBe('black');
  });

  test('expect different type', () => {
    const pawnType = 'white, 23';

    const convert = helper.pawnType(pawnType);

    expect(convert).toBe('white');
  });

  test('expect correct type from queens', () => {
    const pawnType = 'whiteQueen, white';

    const convert = helper.queenType(pawnType);

    expect(convert).toBe('white');
  });

  test('check arrays', () => {
    const arrOne = [1, 2, 3];
    const arrTwo = [1, 2, 3];

    const test = helper.checkArrays(arrOne, arrTwo);

    expect(test).toBe(true);
  });

  test('arrays can by dfifferent', () => {
    const arrOne = [1, 2, 3];
    const arrTwo = [4, 5, 6];

    const test = helper.checkArrays(arrOne, arrTwo);

    expect(test).toBe(false);
  });

  test('should return normal array', () => {
    const arr = [[], [], []];
    const result = helper.combineArray(arr);

    expect(result).toEqual([]);
  });
});
