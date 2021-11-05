import {
  GRID_SIZE,
  direction,
  upJumper,
  downJumper,
  nextRow,
  TOTAL_SIZE,
  BOARD_SIZE
} from '../index';

describe('index', () => {
  test('expect correct data', () => {
    expect(GRID_SIZE).toBe(8);
    expect(direction).toBe(-1);
    expect(upJumper).toBe(9);
    expect(downJumper).toBe(7);
    expect(nextRow).toBe(8);
    expect(TOTAL_SIZE).toBe(63);
    expect(BOARD_SIZE).toBe(64);
  });
});
