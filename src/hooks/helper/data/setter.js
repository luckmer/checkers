import { queenType } from '../../../constants/helper';

const dataSetter = (props) => {
  const { getNumbers, boardData, jumper, id, currentPlayer } = props;

  const increaseJumper = jumper + jumper;

  const positionBeforeUpdate = getNumbers.map((el) =>
    currentPlayer === 'white' ? el + jumper : el - jumper
  );

  const positionFutureUpdate = getNumbers.map((el) =>
    currentPlayer === 'white' ? el + increaseJumper : el - jumper
  );

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

      const typeA = optionA && queenType(optionA.type);
      const typeB = optionB && queenType(optionB.type);
      const typeC = optionC && queenType(optionC.type);

      const switchOption = (id) =>
        currentPlayer === 'white' ? id - jumper : id + jumper;

      if (optionC && switchOption(optionC && optionC.id) === optionB.id) {
        if (typeB === typeC) return undefined;
      }

      if (switchOption(optionB && optionB.id) === optionA.id) {
        if (typeA !== typeB && optionA.type === '') {
          return optionA.id;
        }
      }

      return undefined;
    });

  const blocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = currentPlayer === 'white' ? id - el : el - id;
          return check >= increaseJumper ? el : undefined;
        })
      : JumpMove;

  const clearBlocker = blocker.filter((el) => el);

  return { clearBlocker };
};

export default dataSetter;
