const dataSetter = (props) => {
  const { getNumbers, boardData, jumper, id, currentPlayer } = props;

  const increaseJumper = jumper + jumper;

  const positionBeforeUpdate = getNumbers.map((el) => el + jumper);

  const positionFutureUpdate = getNumbers.map((el) => el + increaseJumper);

  const positionAfter = boardData.filter((el) => getNumbers.includes(el.id));

  const positionFuture = boardData.filter((el) =>
    positionFutureUpdate.includes(el.id)
  );

  const positionBefore = boardData.filter((el) =>
    positionBeforeUpdate.includes(el.id)
  );

  const JumpMove = Array(getNumbers.length)
    .fill(0)
    .map((_, index) => {
      const optionA = positionAfter[index];
      const optionB = positionBefore[index];
      const optionC = positionFuture[index];

      const typeA = optionA && typeGenerator(optionA.type);
      const typeB = optionB && typeGenerator(optionB.type);
      const typeC = optionC && typeGenerator(optionC.type);

      const switchOption = (id) => id - jumper;

      if (optionC && switchOption(optionC && optionC.id) === optionB.id) {
        if (typeB === typeC) return undefined;
      }

      if (switchOption(optionB && optionB.id) === optionA.id) {
        if (typeA !== typeB && optionA.type === "") {
          return optionA.id;
        }
      }

      return undefined;
    });

  const blocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = id - el;
          return check >= jumper ? el : undefined;
        })
      : JumpMove;

  const clearBlocker = blocker.filter((el) => el);

  return { clearBlocker };
};

export default dataSetter;

const typeGenerator = (type) => {
  if (!type) return "";

  return type.includes("Queen")
    ? type.split(" ")[0].replace(/[,]/g, " ").split(" ").pop()
    : type.split(" ")[0].replace(/[,]/g, "");
};
