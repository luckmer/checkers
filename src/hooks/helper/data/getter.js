const dataGetter = (
  oneYAxis,
  boardData,
  move,
  pawnType,
  currentPlayer,
  leftWall,
  clearBlocker,
  jumper
) => {
  const axisXValues = oneYAxis.map(({ id }) => id);

  const PossibleAttack = boardData
    .filter(({ _id }) => move.includes(_id))
    .map((el) => {
      const type = el.type.split(" ")[0].replace(/[,]/g, "");
      return pawnType !== type && type !== "" ? el : undefined;
    })
    .filter((el) => el && axisXValues.includes(el.id));

  const PossibleAttackId = PossibleAttack.find(({ id }) => id)?.id;

  const PossibleBefore =
    PossibleAttackId && currentPlayer === "white"
      ? PossibleAttackId - jumper
      : PossibleAttackId + jumper;

  const checkPossibleBlockX =
    PossibleBefore > 0 || !isNaN(PossibleBefore)
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const checkPossibleBlockY =
    PossibleBefore && !leftWall.includes(PossibleBefore)
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const checkPossibleBlock =
    jumper === 7 ? checkPossibleBlockY : checkPossibleBlockX;

  const CorrectRightMove = !checkPossibleBlock
    ? false
    : checkPossibleBlock.type === "";

  const test = CorrectRightMove
    ? {
        data: clearBlocker,
        jump: true,
      }
    : {
        data: move,
        jump: false,
      };

  return { test, CorrectRightMove };
};

export default dataGetter;
