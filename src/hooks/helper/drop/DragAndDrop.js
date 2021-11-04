import { WallPanelControl } from '../../helper/index';
import { moveIndex } from '../../pawn/MovePawn';
import { direction } from '../../../constants';
import helper from '../../../constants/helper';

import Queen from '../../Queen/Queen';
import Pawn from '../../pawn/Pawn';

const DragAndDrop = (boardData, currentPlayer, setBoard, setCurrentPlayer) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e) => {
    const targetId = e.target.id;
    e.dataTransfer.setData('id', targetId);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData('id'));
    const drop = Number(e.target.id);

    const takePawn = helper?.find(boardData, id);
    const takeDropPawn = helper?.find(boardData, drop);

    const queens = ['whiteQueen', 'blackQueen'];

    const pawnType = helper.pawnType(takePawn?.type);
    const pawnQueen = helper.queenType(takePawn?.type);

    const pawnSwitcher = queens.includes(pawnType) ? pawnQueen : pawnType;

    if (currentPlayer !== pawnSwitcher) return;

    const pawnMoves = moveIndex(pawnType, id);

    const { leftWall, rightWall, whiteWall, blackWall, illegalPosition } =
      WallPanelControl(boardData);

    const clearMove = pawnMoves.filter((el) => !illegalPosition.includes(el));

    const move = illegalPosition.includes(id) ? clearMove : pawnMoves;

    const wallProps = { leftWall, rightWall, whiteWall, blackWall };

    const playerProps = { takePawn, direction, currentPlayer, pawnType };
    const props = { ...wallProps, ...playerProps, boardData, id, move, drop };

    switch (pawnType) {
      case 'whiteQueen':
        Queen({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
      case 'blackQueen':
        Queen({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
      case 'white':
        Pawn({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
      case 'black':
        Pawn({ ...props, takeDropPawn, setBoard, setCurrentPlayer });
        break;
      default:
        break;
    }
  };

  return { handleDragOver, handleDragStart, handleDrop };
};

export default DragAndDrop;
