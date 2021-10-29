const IdGetter = (props) => {
  const { boardData, move, pawnType, axisXValues } = props;

  const PossibleAttack = boardData
    .filter(({ _id }) => move.includes(_id))
    .map((el) => {
      const type = el.type.split(' ')[0].replace(/[,]/g, '');
      return pawnType !== type && type !== '' ? el : undefined;
    })
    .filter((el) => el && axisXValues.includes(el.id));

  const PossibleAttackId = PossibleAttack.find(({ id }) => id)?.id;

  return PossibleAttackId;
};

export default IdGetter;
