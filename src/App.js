import { useState } from "react";

import { CheckersSection, Div } from "./css/CheckersSection.Style";
import { finderDataType, targetDataType } from "./hooks/helper/index";

import ChessMapGenerator from "./service/BoardGenerator";
import Queen from "./hooks/Queen/Queen";
import Pawn from "./hooks/pawn/Pawn";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const { boardData, setBoard } = ChessMapGenerator();

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e) => {
    const targetId = e.target.id;
    e.dataTransfer.setData("id", targetId);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const props = { e, boardData, currentPlayer, setBoard, setCurrentPlayer };
    const { PROPS, MOVE, type } = DropHelper({ ...props });

    if (!MOVE) return;

    switch (type) {
      case "white":
        Pawn({ ...PROPS });
        break;
      case "black":
        Pawn({ ...PROPS });
        break;
      case "whiteQueen":
        Queen({ ...PROPS });
        break;
      case "blackQueen":
        Queen({ ...PROPS });
        break;
      default:
        break;
    }
  };

  return (
    <CheckersSection>
      {boardData.map((el, i) => {
        const check = el.Img === "Empty";

        return (
          <Div
            key={i}
            type={el.type}
            id={el.id}
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => (check ? null : handleDragStart(e))}
            onDrop={(e) => handleDrop(e)}
            Design={el.background}
            IMG={el.Img}
            draggable={check ? null : true}
          ></Div>
        );
      })}
    </CheckersSection>
  );
};

export default App;

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
