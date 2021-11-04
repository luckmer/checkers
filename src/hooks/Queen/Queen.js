import { SwitchQueen } from '../helper/player';
import { CreateQueen } from '../helper/board';
import QueenAttack from './QueenAttack';

const Queen = (props) => {
  const { setCurrentPlayer, currentPlayer, takeDropPawn, setBoard } = props;

  const { attack, clearRoad } = QueenAttack({ ...props });

  if (takeDropPawn && takeDropPawn.type === '' && attack) {
    const update = CreateQueen({ ...props, clearRoad });

    setBoard(update);
    const queenSwitcher = SwitchQueen({ ...props, clearRoad });

    if (!queenSwitcher) {
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  }
};

export default Queen;
