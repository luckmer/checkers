import { useState } from "react";
import ChessMapGenerator from "./service/BoardGenerator";

import { CheckersSection, Div } from "./css/CheckersSection.Style";
import * as constants from "./constants/helper";
import { moveIndex } from "./hooks/pawn/MovePawn";
import { wallCreator } from "./constants/helper";
import { WallPanelControl } from "./hooks/helper";
import { direction } from "./constants";
import { Axis, YAxis } from "./hooks/helper/axis";

import switchPlayer from "./hooks/helper/player/switchPlayer";
import BoardUpdate from "./hooks/helper/board/boardUpdate";
import BlockFinder from "./hooks/helper/board/blockFinder";
import dataSetter from "./hooks/helper/data/setter";
import dataGetter from "./hooks/helper/data/getter";

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
    const id = Number(e.dataTransfer.getData("id"));
    const drop = Number(e.target.id);

    const takePawn = constants.find(boardData, id);
    const takeDropPawn = constants.find(boardData, drop);

    const pawnType = takePawn.type.split(" ")[0].replace(/[,]/g, "");

    if (currentPlayer !== pawnType) return;

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
    };

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

    if (
      takeDropPawn &&
      takeDropPawn.type === "" &&
      detectValues?.data.includes(drop)
    ) {
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

const ControlLeftSite = ({
  boardData,
  takePawn,
  direction,
  leftWall,
  rightWall,
  currentPlayer,
  id,
  move,
  pawnType,
}) => {
  const oneAxis = Axis(
    boardData,
    takePawn,
    direction,
    leftWall,
    rightWall,
    currentPlayer
  );

  const data = BlockFinder(oneAxis, currentPlayer, boardData, 9);

  const onlyEmptyJump = data.filter((el) => el.type === "").map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);

  const positionBeforeUpdate = getNumbers.map((el) =>
    currentPlayer === "white" ? el + 9 : el - 9
  );
  const positionFutureUpdate = getNumbers.map((el) =>
    currentPlayer === "white" ? el + 18 : el - 9
  );

  const positionAfter = boardData.filter((el) => getNumbers.includes(el.id));

  const positionFuture = boardData.filter((el) =>
    positionFutureUpdate.includes(el.id)
  );

  const positionBefore = boardData.filter((el) =>
    positionBeforeUpdate.includes(el.id)
  );

  const JumpMove = Array(getNumbers.length)
    .fill(0)
    .map((_, index) => {
      const optionA = positionAfter[index];
      const optionB = positionBefore[index];
      const optionC = positionFuture[index];

      const type = (obj) =>
        obj ? obj.type.split(" ")[0].replace(/[,]/g, "") : "";

      const typeA = type(optionA);
      const typeB = type(optionB);
      const typeC = type(optionC);

      const switchOption = (id) =>
        currentPlayer === "white" ? id - 9 : id + 9;

      if (switchOption(optionC.id) === optionB.id) {
        if (typeB === typeC) return undefined;
      }

      if (switchOption(optionB.id) === optionA.id) {
        if (typeA !== typeB && optionA.type === "" && typeB !== currentPlayer) {
          return optionA.id;
        }
      }

      return undefined;
    });

  const blocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = currentPlayer === "white" ? id - el : el - id;
          return check >= 18 ? el : undefined;
        })
      : JumpMove;

  const clearBlocker = blocker.filter((el) => el);
  const axisXValues = oneAxis.map(({ id }) => id);

  const PossibleAttack = boardData
    .filter(({ _id }) => move.includes(_id))
    .map((el) => {
      const type = el.type.split(" ")[0].replace(/[,]/g, "");
      return pawnType !== type && type !== "" ? el : undefined;
    })
    .filter((el) => el && axisXValues.includes(el.id));

  const PossibleAttackId = PossibleAttack.find(({ id }) => id)?.id;

  const PossibleBefore =
    PossibleAttackId && currentPlayer === "white"
      ? PossibleAttackId - 9
      : PossibleAttackId + 9;

  const checkPossibleBlock =
    PossibleBefore > 0 || !isNaN(PossibleBefore)
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const correctLeftMove = !checkPossibleBlock
    ? false
    : checkPossibleBlock.type === "";

  const detectAttack = correctLeftMove
    ? {
        data: clearBlocker,
        jump: true,
      }
    : {
        data: move,
        jump: false,
      };

  return { detectAttack, correctLeftMove, oneAxis };
};

const ControlRightSite = ({
  boardData,
  takePawn,
  rightWall,
  leftWall,
  currentPlayer,
  id,
  move,
  pawnType,
}) => {
  const { switchCleaner, properties, oneYAxis } = YAxis(
    boardData,
    takePawn,
    rightWall,
    leftWall,
    currentPlayer
  );

  const data = switchCleaner
    ? properties.filter((el) =>
        currentPlayer === "white"
          ? el.id >= switchCleaner
          : el.id <= switchCleaner
      )
    : properties;

  const onlyEmptyJump = data.filter((el) => el.type === "").map(({ id }) => id);

  const getNumbers = onlyEmptyJump.filter((el) => el);

  const positionBeforeUpdate = getNumbers.map((el) =>
    currentPlayer === "white" ? el + 7 : el - 7
  );

  const positionFutureUpdate = getNumbers.map((el) =>
    currentPlayer === "white" ? el + 14 : el - 7
  );

  const positionAfter = boardData.filter((el) => getNumbers.includes(el.id));

  const positionFuture = boardData.filter((el) =>
    positionFutureUpdate.includes(el.id)
  );

  const positionBefore = boardData.filter((el) =>
    positionBeforeUpdate.includes(el.id)
  );

  const JumpMove = Array(getNumbers.length)
    .fill(0)
    .map((_, index) => {
      const optionA = positionAfter[index];
      const optionB = positionBefore[index];
      const optionC = positionFuture[index];

      const type = (obj) =>
        obj ? obj.type.split(" ")[0].replace(/[,]/g, "") : "";

      const typeA = type(optionA);
      const typeB = type(optionB);
      const typeC = type(optionC);

      const switchOption = (id) =>
        currentPlayer === "white" ? id - 7 : id + 7;

      if (switchOption(optionC.id) === optionB.id) {
        if (typeB === typeC) return undefined;
      }

      if (switchOption(optionB.id) === optionA.id) {
        if (typeA !== typeB && optionA.type === "" && typeB !== currentPlayer) {
          return optionA.id;
        }
      }

      return undefined;
    });

  const blocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = currentPlayer === "white" ? id - el : el - id;
          console.log(check);
          return check >= 14 ? el : undefined;
        })
      : JumpMove;

  const clearBlocker = blocker.filter((el) => el);

  const axisXValues = oneYAxis.map(({ id }) => id);

  const PossibleAttack = boardData
    .filter(({ _id }) => move.includes(_id))
    .map((el) => {
      const type = el.type.split(" ")[0].replace(/[,]/g, "");
      return pawnType !== type && type !== "" ? el : undefined;
    })
    .filter((el) => el && axisXValues.includes(el.id));

  const PossibleAttackId = PossibleAttack.find(({ id }) => id)?.id;

  const PossibleBefore =
    PossibleAttackId && currentPlayer === "white"
      ? PossibleAttackId - 7
      : PossibleAttackId + 7;

  const checkPossibleBlock =
    PossibleBefore && !rightWall.includes(PossibleBefore)
      ? boardData.find((el) => el.id === PossibleBefore)
      : undefined;

  const CorrectRightMove = !checkPossibleBlock
    ? false
    : checkPossibleBlock.type === "";

  const test = CorrectRightMove
    ? {
        data: clearBlocker,
        jump: true,
      }
    : {
        data: move,
        jump: false,
      };

  return { test, CorrectRightMove, oneYAxis };

  // const { switchCleaner, properties, oneYAxis } = YAxis(
  //   boardData,
  //   takePawn,
  //   rightWall,
  //   leftWall,
  //   currentPlayer
  // );

  // const data = switchCleaner
  //   ? properties.filter((el) =>
  //       currentPlayer === "white"
  //         ? el.id >= switchCleaner
  //         : el.id <= switchCleaner
  //     )
  //   : properties;

  // const onlyEmptyJump = data.filter((el) => el.type === "").map(({ id }) => id);

  // const getNumbers = onlyEmptyJump.filter((el) => el);

  // const jumper = 7;

  // const { clearBlocker } = dataSetter(
  //   getNumbers,
  //   currentPlayer,
  //   boardData,
  //   jumper,
  //   id
  // );

  // const { test, CorrectRightMove } = dataGetter(
  //   oneYAxis,
  //   boardData,
  //   move,
  //   pawnType,
  //   currentPlayer,
  //   leftWall,
  //   clearBlocker,
  //   jumper
  // );

  // return { test, CorrectRightMove, oneYAxis };
};
