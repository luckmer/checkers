import helper from '../../constants/helper';

const PawnAttack = (props) => {
  const { move, drop, detectAttack, test } = props;

  const sameMove = helper.checkArrays(test.data, detectAttack.data);

  const detectValues = sameMove
    ? detectAttack
    : test.jump && detectAttack.jump
    ? { detectAttack, test }
    : test.jump && test.data.length
    ? test
    : detectAttack.jump && detectAttack.data.length
    ? detectAttack
    : move;

  return detectValues && detectValues?.data
    ? detectValues && detectValues?.data.includes(drop)
    : detectValues && detectValues?.detectAttack
    ? [
        ...detectValues?.detectAttack.data,
        ...detectValues?.test.data
      ]?.includes(drop)
    : detectValues.includes(drop);
};

export default PawnAttack;
