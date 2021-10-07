import { WallPanelControl } from "../helper/index";
import { TargetType } from "../../constants/helper";
import { moveIndex } from "./MovePawn";

const PawnHelper = (boardData, type, pawnID, dropId) => {
  const illegalPosition = WallPanelControl(boardData);

  const movePawn = moveIndex(type, pawnID);

  const clearMove = movePawn.filter((el) => !illegalPosition.includes(el));

  const move = illegalPosition.includes(pawnID) ? clearMove : movePawn;

  const attackPosition = boardData
    .filter((el) => move.includes(el._id))
    .map((el) => {
      const ID = el.id;
      const calcWhite = ~~(pawnID - ID);
      const calcBlack = ~~(ID - pawnID + ID);
      let test = TargetType(el.type, 0);
      const controlType = type === "white" ? ID - calcWhite : calcBlack;

      if (el.Img !== "Empty" && type !== test && dropId === controlType) {
        const result = { id: controlType, killed: ID, killedImg: el.Img };

        return result;
      }

      return { id: ID };
    });

  const attack = attackPosition.map((el) => el.id);
  const killedPawn = attackPosition.find((el) => el?.killed);

  return { attack, killedPawn };
};

export default PawnHelper;
