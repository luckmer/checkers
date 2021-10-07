import PawnHelper from "./PawnHelper";
import { CreateQueen, updatePosition } from "../Board";
import { getArrayEdges } from "../../constants/helper";

const Pawn = ({
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
  const { attack, killedPawn } = PawnHelper(boardData, type, pawnID, dropId);

  const fromRight = 0;
  const toRight = 8;
  const fromLeft = 57;
  const toLeft = 64;

  const blackWall = getArrayEdges(boardData, fromRight, toRight);
  const whiteWall = getArrayEdges(boardData, fromLeft, toLeft);

  if (takeBlock && takeBlock.type === "" && attack.includes(dropId)) {
    const props = { boardData, dropId, takePawn, killedPawn, type };

    const Update =
      (blackWall.includes(dropId) && type !== "Queen") ||
      (whiteWall.includes(dropId) && type !== "Queen")
        ? CreateQueen(props)
        : updatePosition(props);

    setBoard(Update);
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  }
};
export default Pawn;
