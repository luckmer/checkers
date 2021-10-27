import { useState } from "react";
import ChessMapGenerator from "./service/BoardGenerator";

import { CheckersSection, Div } from "./css/CheckersSection.Style";
import * as constants from "./constants/helper";
import { moveIndex } from "./hooks/pawn/MovePawn";
import { wallCreator } from "./constants/helper";
import { WallPanelControl } from "./hooks/helper";
import { direction } from "./constants";

import switchPlayer from "./hooks/helper/player/switchPlayer";
import BoardUpdate from "./hooks/helper/board/boardUpdate";
import { ControlRightSite, ControlLeftSite } from "./hooks/pawn/index";
import ControlQueen from "./hooks/Queen/ControlQueen";

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState("black");

  const { boardData, setBoard } = ChessMapGenerator();

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e) => {
    const targetId = e.target.id;
    e.dataTransfer.setData("id", targetId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("id"));
    const drop = Number(e.target.id);

    const takePawn = constants?.find(boardData, id);
    const takeDropPawn = constants?.find(boardData, drop);

    const queens = ["whiteQueenwhite", "blackQueenblack"];
    const pawnType = constants.pawnType(takePawn.type);
    const pawnQueen = constants.queenType(takePawn.type);

    const pawnSwitcher = queens.includes(pawnType) ? pawnQueen : pawnType;

    if (currentPlayer !== pawnSwitcher) return;

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

    const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite({
      ...props,
    });
    const { test, CorrectRightMove, oneYAxis } = ControlRightSite({ ...props });
    const {} = ControlQueen({ ...props });

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

      // if ((!CorrectRightMove && !correctLeftMove) || !playerChanger) {
      //   setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
      // }
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
