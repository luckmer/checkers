import { finderDataType, targetDataType } from "../hooks/helper";

const DropHelper = (props) => {
  const { e, boardData, currentPlayer, setBoard, setCurrentPlayer } = props;

  const id = e.dataTransfer.getData("id");
  const grabbedAsNumber = Number(id);
  const dropId = Number(e.target.id);

  const { takeBlock, takePawn } = finderDataType(
    boardData,
    dropId,
    grabbedAsNumber
  );

  const { type, FindTargetType } = targetDataType(takeBlock, takePawn);

  const pawnID = takePawn.id;

  const arrCenter = type.length / 2;

  const moveType = type.includes("Queen") ? type.slice(0, arrCenter) : type;

  const checkPlayer = currentPlayer === moveType;

  const DifferentColor = moveType !== FindTargetType;

  const MOVE = checkPlayer && DifferentColor;

  const PROPS = {
    boardData,
    type,
    pawnID,
    dropId,
    takeBlock,
    takePawn,
    setBoard,
    setCurrentPlayer,
    currentPlayer,
  };

  return { PROPS, MOVE, type };
};

export default DropHelper;
