import { useState } from "react";
import ChessMapGenerator from "./service/BoardGenerator";

import { CheckersSection, Div } from "./css/CheckersSection.Style";
import * as constants from "./constants/helper";
import { moveIndex } from "./hooks/pawn/MovePawn";
import { wallCreator } from "./constants/helper";
import { WallPanelControl } from "./hooks/helper";
import { direction } from "./constants";
import blackPawn from "./hooks/pawn/blackPawn";
import whitePawn from "./hooks/pawn/whitePawn";

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

    const { detectAttack, correctLeftMove, oneAxis } = ControlLeftSite(
      boardData,
      takePawn,
      direction,
      leftWall,
      rightWall,
      currentPlayer,
      id,
      move,
      pawnType
    );

    const { test, CorrectRightMove, oneYAxis } = ControlRightSite(
      boardData,
      takePawn,
      rightWall,
      leftWall,
      currentPlayer,
      id,
      move,
      pawnType
    );

    const sameMove = constants.checkArrays(test.data, detectAttack.data);
    const playerType = constants.TargetType(takePawn.type, 0);

    switch (currentPlayer) {
      case currentPlayer === "white" && playerType === currentPlayer:
        whitePawn();
        break;
      case currentPlayer === "black" && playerType === currentPlayer:
        blackPawn();
        break;
      default:
        break;
    }

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

  const { rightWall, leftWall, IncreaseDrop } = dropPanel(
    boardData,
    dropPosition,
    currentPlayer
  );

  if (rightWall.includes(drop) || leftWall.includes(drop)) return false;

  if (CorrectRightMove || correctLeftMove) {
    const findDropObj = boardData
      .filter((el) => IncreaseDrop.includes(el.id))
      .map(({ type }) => type);

    return findDropObj.includes("") ? true : false;
  }
  return false;
};

export default App;

const ControlLeftSite = (
  boardData,
  takePawn,
  direction,
  leftWall,
  rightWall,
  currentPlayer,
  id,
  move,
  pawnType
) => {
  //
  const XCheckTopWhite = boardData.filter(
    (item) =>
      parseFloat(item.id) % 9 === (takePawn._id % 9) - direction - 1 &&
      parseFloat(item.id) <= takePawn._id
  );

  const XTopWallCollision = XCheckTopWhite.filter((el) =>
    leftWall.includes(el.id)
  ).map(({ id }) => id)[0];

  const XTopWall = XCheckTopWhite.filter((el) =>
    !XTopWallCollision ? el : el.id >= XTopWallCollision
  );

  const XCheckTopBlack = boardData.filter(
    (item) =>
      parseFloat(item.id) % 9 === (takePawn._id % 9) - direction - 1 &&
      parseFloat(item.id) >= takePawn._id
  );

  const XBlackWallCollision = XCheckTopBlack.filter((el) =>
    rightWall.includes(el.id)
  ).map(({ id }) => id)[0];

  const XBlackWall = XCheckTopBlack.filter((el) =>
    !XBlackWallCollision ? el : el.id <= XBlackWallCollision
  );

  const oneAxis = currentPlayer === "white" ? XTopWall : XBlackWall;

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

const BlockFinder = (oneAxis, currentPlayer, boardData, direction) => {
  const blackBlocks = oneAxis
    .filter((el) => {
      const Player = el.type.split(" ")[0].replace(/[,]/g, "");

      return Player !== currentPlayer;
    })
    .filter((el) => el.type)
    .map(({ id }) => id);

  const higher = blackBlocks.map((el) => [el - direction, el, el + direction]);
  const smaller = blackBlocks.map((el) => [el + direction, el, el - direction]);

  const findEmptySpace = [
    ...new Set(constants.combineArray([...higher, ...smaller])),
  ];

  const data = boardData.filter((el) => findEmptySpace.includes(el.id));

  return data;
};

const dropPanel = (boardData, dropPosition, currentPlayer) => {
  const leftWall = wallCreator(boardData, (item) => item.id % 8 === 1);
  const rightWall = wallCreator(boardData, (item) => item.id % 8 === 0);

  const IncreaseWhite = dropPosition.map((el, index) => {
    if (rightWall.includes(el) || leftWall.includes(el)) return undefined;

    const jumpX = 9,
      jumpY = 7;

    if (index === 0 && currentPlayer === "white") {
      return el - jumpX;
    }
    return el - jumpY;
  });

  const increaseBlack = dropPosition.map((el, index) => {
    if (rightWall.includes(el) || leftWall.includes(el)) return undefined;
    const jumpX = 9,
      jumpY = 7;

    return index === 1 ? el + jumpX : el + jumpY;
  });

  const IncreaseDrop =
    currentPlayer === "white" ? IncreaseWhite : increaseBlack;
  return { rightWall, leftWall, IncreaseDrop };
};

const BoardUpdate = (
  takePawn,
  drop,
  oneYAxis,
  oneAxis,
  currentPlayer,
  boardData
) => {
  const pawn = takePawn.id;
  const jump = drop;

  const clearX = constants.values(oneYAxis);
  const clearY = constants.values(oneAxis);

  const blackX = constants.blackAxis(clearX, pawn, jump);
  const blackY = constants.blackAxis(clearY, pawn, jump);
  const whiteX = constants.whiteAxis(clearX, pawn, jump);
  const whiteY = constants.whiteAxis(clearY, pawn, jump);

  const switchX = currentPlayer === "white" ? whiteX : blackX;
  const switchY = currentPlayer === "white" ? whiteY : blackY;

  const XJump = clearX.includes(jump) ? switchX : undefined;
  const YJump = clearY.includes(jump) ? switchY : undefined;

  const update = boardData.map((el) => {
    const ids = Number(el.id);

    if (ids === Number(drop)) {
      return { ...el, Img: takePawn.Img, type: takePawn.type };
    }

    if (
      (XJump && XJump.includes(ids)) ||
      (YJump && YJump.includes(ids)) ||
      ids === Number(takePawn.id)
    ) {
      return { ...el, Img: "Empty", type: "" };
    }

    return el;
  });
  return update;
};

const ControlRightSite = (
  boardData,
  takePawn,
  rightWall,
  leftWall,
  currentPlayer,
  id,
  move,
  pawnType
) => {
  //
  const YCheckTopWhite = boardData.filter((item) => {
    const Item = Number(item.id);
    return (
      Item % 7 === (takePawn.id % 7) - direction - 1 &&
      takePawn.id % 8 >= 0 &&
      Item <= takePawn.id
    );
  });

  const YTopWallCollision = constants.wallDetector(YCheckTopWhite, (el) =>
    rightWall.includes(el.id)
  );

  const YTopWall = YCheckTopWhite.filter((el) =>
    !YTopWallCollision ? el : el.id >= YTopWallCollision
  );

  const YCheckTopBlack = boardData.filter((item) => {
    const Item = Number(item.id);
    return (
      Item % 7 === (takePawn.id % 7) - direction - 1 &&
      takePawn.id % 8 >= 0 &&
      Item >= takePawn.id
    );
  });

  const YBlackWallCollision = constants.wallDetector(YCheckTopBlack, (el) =>
    leftWall.includes(el.id)
  );

  const YBlackWall = YCheckTopBlack.filter((el) =>
    !YBlackWallCollision ? el : el.id <= YBlackWallCollision
  );

  const oneYAxis = currentPlayer === "white" ? YTopWall : YBlackWall;
  const properties = BlockFinder(oneYAxis, currentPlayer, boardData, 7);

  const switchCleaner =
    currentPlayer === "white" ? YTopWallCollision : YBlackWallCollision;

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
        if (typeA !== typeB && optionA.type === "") {
          return optionA.id;
        }
      }

      return undefined;
    });

  const blocker =
    JumpMove.length === 1
      ? JumpMove.map((el) => {
          const check = currentPlayer === "white" ? id - el : el - id;
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
    PossibleBefore && !leftWall.includes(PossibleBefore)
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
};
