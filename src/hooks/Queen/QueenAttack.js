import QueenMovesArray from './QueenMoves';
import helper from '../../constants/helper';

const QueenAttack = (props) => {
  const { drop, rightWall, leftWall } = props;

  const moves = QueenMovesArray(props);

  const moveData = moves.map(({ data }) => data);

  const dropMove = helper.combineArray(moveData);

  const dropSwitcher = dropMove.includes(drop);

  const clearRoad = moves.find(({ data }) => data.includes(drop));

  const attacks = moves
    .filter(({ option }) => option.jump === true)
    .map(({ data }) => {
      if (drop % 8 === 2) {
        const illegalLeftData = rightWall.filter((el) => data.includes(el));

        return data.filter((el) => !illegalLeftData.includes(el));
      }

      if (drop % 8 === 7) {
        const illegalRightData = leftWall.filter((el) => data.includes(el));

        return data.filter((el) => !illegalRightData.includes(el));
      }

      return data;
    });

  const connectAttacks = [...new Set(helper.combineArray(attacks))];

  const dropAttack = connectAttacks.includes(drop);

  const attack = connectAttacks.length ? dropAttack : dropSwitcher;

  return { attack, clearRoad };
};

export default QueenAttack;
