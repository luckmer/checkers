import { wallCreator } from "../../../constants/helper";
import { moveIndex } from "../../pawn/MovePawn";
import { direction } from "../../../constants";
import { WallPanelControl } from "..";

import * as constants from "../../../constants/helper";

const handleDragData = (boardData, e, currentPlayer) => {
  const id = Number(e.dataTransfer.getData("id"));
  const drop = Number(e.target.id);

  const takePawn = constants?.find(boardData, id);
  const takeDropPawn = constants?.find(boardData, drop);

  const pawnType = takePawn.type.split(" ")[0].replace(/[,]/g, "");

  if (currentPlayer !== pawnType) return;

  const pawnMoves = moveIndex(pawnType, id);
  const illegalPosition = WallPanelControl(boardData);
  const clearMove = pawnMoves.filter((el) => !illegalPosition.includes(el));

  const move = illegalPosition.includes(id) ? clearMove : pawnMoves;

  const leftWall = wallCreator(boardData, (item) => item.id % 8 === 1);
  const rightWall = wallCreator(boardData, (item) => item.id % 8 === 0);

  const props = {
    boardData,
    takePawn,
    direction,
    leftWall,
    rightWall,
    currentPlayer,
    id,
    move,
    pawnType,
    drop,
  };
  if (!props) return;

  return { props, move, pawnType, drop, takeDropPawn, takePawn };
};

export default handleDragData;
