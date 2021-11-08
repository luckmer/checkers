import PawnAttack from '../PawnAttack';

describe('pawn attack', () => {
  test('should not  generate attack', () => {
    const move = [34, 36];
    const drop = 36;
    const detectAttack = { data: [34, 36], jump: false };
    const test = { data: [34, 36], jump: false };

    const possibleAttack = PawnAttack({ move, drop, detectAttack, test });

    expect(possibleAttack).toBe(true);
  });

  test('should epect different drop positions', () => {
    const move = [38, 40];
    const drop = 38;
    const detectAttack = { data: [38, 40], jump: false };
    const test = { data: [38, 40], jump: false };

    const possibleAttack = PawnAttack({ move, drop, detectAttack, test });

    expect(possibleAttack).toBe(true);
  });
});
