import { ControlLeftSite, ControlRightSite } from './index';
import { CreateQueen, BoardUpdate } from '../helper/board';
import { switchPlayer } from '../helper/player';

import PawnAttack from './PawnAttack';

const Pawn = (props) => {
  const { currentPlayer, boardData, pawnType, drop } = props;
  const { takeDropPawn, whiteWall, blackWall, setBoard, setCurrentPlayer } =
    props;

  const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite({
    ...props
  });

  const { test, CorrectRightMove, oneYAxis } = ControlRightSite({
    ...props
  });

  const dropSwitcher = PawnAttack({ ...props, detectAttack, test });

  const PROPS = {
    CorrectRightMove,
    correctLeftMove,
    currentPlayer,
    boardData,
    pawnType,
    drop
  };

  const playerChanger = switchPlayer({ ...PROPS });

  if (takeDropPawn && takeDropPawn.type === '' && dropSwitcher) {
    const update =
      blackWall.includes(drop) || whiteWall.includes(drop)
        ? CreateQueen({ ...props, oneYAxis, oneAxis })
        : BoardUpdate({ ...props, oneYAxis, oneAxis });

    setBoard(update);

    if ((!CorrectRightMove && !correctLeftMove) || !playerChanger) {
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  }
};

export default Pawn;
