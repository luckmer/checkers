import { useState } from "react";
import { CheckersSection, Div } from "./css/CheckersSection.Style";
import { ControlLeftSite, ControlRightSite } from "./hooks/pawn/index";

import switchPlayer from "./hooks/helper/player/switchPlayer";
import BoardUpdate from "./hooks/helper/board/boardUpdate";
import handleDragData from "./hooks/helper/drop/dragData";
import ChessMapGenerator from "./service/BoardGenerator";
import * as constants from "./constants/helper";

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

    const { props, move, pawnType, drop, takeDropPawn, takePawn } =
      handleDragData(boardData, e, currentPlayer);

    const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite({
      ...props,
    });

    const { test, CorrectRightMove, oneYAxis } = ControlRightSite({ ...props });

    const sameMove = constants.checkArrays(test.data, detectAttack.data);

    const detectValues = sameMove
      ? detectAttack
      : test.jump && detectAttack.jump
      ? { detectAttack, test }
      : test.jump && test.data.length
      ? test
      : detectAttack.jump && detectAttack.data.length
      ? detectAttack
      : move;

    const PROPS = {
      CorrectRightMove,
      correctLeftMove,
      currentPlayer,
      boardData,
      pawnType,
      drop,
    };

    const playerChanger = switchPlayer({ ...PROPS });

    const dropSwitcher = detectValues.data
      ? detectValues?.data.includes(drop)
      : detectValues && detectValues?.includes(drop);

    if (takeDropPawn && takeDropPawn.type === "" && dropSwitcher) {
      const update = BoardUpdate(
        takePawn,
        drop,
        oneYAxis,
        oneAxis,
        currentPlayer,
        boardData
      );

      setBoard(update);

      if ((!CorrectRightMove && !correctLeftMove) || !playerChanger) {
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
      }
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
