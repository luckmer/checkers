import QueenHelper from "./QueenHelper";
import moveQueen from "./MoveQueen";
import { updatePosition } from "../Board";

const Queen = ({
  boardData,
  type,
  pawnID,
  dropId,
  takeBlock,
  takePawn,
  setBoard,
  setCurrentPlayer,
  currentPlayer,
}) => {
  const queenId = takePawn.id;

  const queenMoveValues = moveQueen(queenId);

  const { attack, killedPawn } = QueenHelper(
    boardData,
    queenMoveValues,
    pawnID,
    type,
    dropId
  );

  if (
    takeBlock &&
    takeBlock.type === "" &&
    attack.includes(dropId) &&
    type.includes("Queen")
  ) {
    const props = { boardData, dropId, takePawn, killedPawn };
    const Update = updatePosition(props);

    setBoard(Update);
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  }
};

export default Queen;
