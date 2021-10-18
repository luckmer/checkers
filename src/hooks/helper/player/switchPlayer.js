import { moveIndex } from "../../pawn/MovePawn";
import dropPanel from "../drop/dropPanel";

const switchPlayer = (props) => {
  const {
    CorrectRightMove,
    correctLeftMove,
    currentPlayer,
    boardData,
    pawnType,
    drop,
  } = props;

  const dropPosition = moveIndex(pawnType, drop);
  const getter = (arr, element) =>
    arr.filter((el) => element.includes(el.id)).map(({ type }) => type);

  const noMoves = getter(boardData, dropPosition).filter((el) => el !== "");

  if (!noMoves.length) return false;

  const { rightWall, leftWall, IncreaseDrop } = dropPanel(
    boardData,
    dropPosition,
    currentPlayer
  );

  if (rightWall.includes(drop) || leftWall.includes(drop)) return false;

  if (CorrectRightMove || correctLeftMove) {
    const findDropObj = getter(boardData, IncreaseDrop);

    return findDropObj.includes("") ? true : false;
  }
  return false;
};

export default switchPlayer;
