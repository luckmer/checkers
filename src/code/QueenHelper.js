import { WallPanelControl } from "../helper/index";
import { TargetType } from "../../constants/helper";

const QueenHelper = (boardData, queenMoveValues, pawnID, type, dropId) => {
  const illegalPosition = WallPanelControl(boardData);

  const queenMove = queenMoveValues.filter((el) => el >= 0);

  const clearQueenMove = queenMove.filter(
    (el) => !illegalPosition.includes(el)
  );

  const move = illegalPosition.includes(pawnID) ? clearQueenMove : queenMove;

  const attackPosition = boardData
    .filter((el) => move.includes(el._id))
    .map((el) => {
      const ID = el.id;
      const differentType = TargetType(el.type, 0);

      const rightTop = ID - ~~(pawnID - ID);
      const rightBottom = ID + ~~(ID - pawnID);
      const leftTop = ~~(ID - pawnID + ID);
      const leftBottom = ID + ~~(ID - pawnID);

      const possibleAttackMove = [rightTop, leftTop, rightBottom, leftBottom];

      if (
        el.Img !== "Empty" &&
        type !== differentType &&
        possibleAttackMove.includes(dropId)
      ) {
        const result = { id: dropId, killed: ID, killedImg: el.Img };
        return result;
      }

      return { id: ID };
    });

  const attack = attackPosition.map((el) => el.id);
  const killedPawn = attackPosition.find((el) => el?.killed);

  return { attack, killedPawn };
};

export default QueenHelper;
