import { useState } from "react";

import { CheckersSection, Div } from "./css/CheckersSection.Style";

import ChessMapGenerator from "./service/BoardGenerator";
import DropHelper from "./dragAndDrop/dropHelper";
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
