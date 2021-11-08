import { moveIndex } from '../MovePawn';

describe('moveIndex', () => {
  test('should generate move', () => {
    const player = 'white';
    const jump = 34;
    const move = moveIndex(player, jump);

    expect(move).toEqual([25, 27]);
  });

  test('should expect different player', () => {
    const player = 'black';
    const jump = 34;
    const move = moveIndex(player, jump);

    expect(move).toEqual([41, 43]);
  });

  test('should expect different position', () => {
    const player = 'black';
    const jump = 40;
    const move = moveIndex(player, jump);

    expect(move).toEqual([47, 49]);
  });

  test('should expect data', () => {
    const player = 'black';
    const jump = 40;
    const move = moveIndex(player, jump);

    expect(move).not.toEqual([]);
  });
});
