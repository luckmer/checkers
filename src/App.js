import { useState } from "react";
import ChessMapGenerator from "./service/BoardGenerator";
import { CheckersSection, Div } from "./css/CheckersSection.Style";
import { GRID_SIZE } from "./constants/index";
import { TargetType, wallCreator, dataFinder } from "./constants/helper";
import { updatePosition } from "./hooks/index";

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
    const id = e.dataTransfer.getData("id");
    const grabbedAsNumber = Number(id);
    const dropId = Number(e.target.id);

    const wall1Pos = 1;
    const wall2Pos = 0;

    const illegalPosition = WallPanelControl(boardData, wall1Pos, wall2Pos);

    const takeBlock = dataFinder(boardData, (finder) => finder._id === dropId);
    const takePawn = dataFinder(
      boardData,
      (finder) => finder._id === grabbedAsNumber
    );

    const FindTargetType = TargetType(takeBlock.type, 0);
    let type = TargetType(takePawn.type, 0);
    if (!type) type = TargetType(takePawn.type, 0);

    const pawnID = takePawn.id;

    const moveIndex =
      type === "white"
        ? [pawnID - GRID_SIZE - 1, pawnID - GRID_SIZE + 1]
        : [pawnID + GRID_SIZE - 1, pawnID + GRID_SIZE + 1];

    const clearMove = moveIndex.filter((el) => !illegalPosition.includes(el));

    const move = illegalPosition.includes(pawnID) ? clearMove : moveIndex;

    const checkPlayer = currentPlayer === type;
    const DifferentColor = type !== FindTargetType;

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

    console.log(attackPosition);

    const MOVE = checkPlayer && DifferentColor;

    if (!MOVE) return;

    if (takeBlock && takeBlock.type === "" && attack.includes(dropId)) {
      const props = { boardData, dropId, takePawn, killedPawn };
      const Update = updatePosition(props);
      setBoard(Update);
      setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
    }
  };

  return (
    <CheckersSection>
      {boardData.map((el, i) => {
        const check = el.Img === "Empty";

        return (
          <Div
            key={i}
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
const WallPanelControl = (boardData, wall1Pos, wall2Pos) => {
  const wall1 = wallCreator(boardData, (item) => item.id % 8 === wall1Pos);

  const wall2 = wallCreator(boardData, (item) => item.id % 8 === wall2Pos);

  const illegalPosition = [...wall1, ...wall2];

  return illegalPosition;
};
