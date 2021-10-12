import { useState } from "react";

import { CheckersSection, Div } from "./css/CheckersSection.Style";

import ChessMapGenerator from "./service/BoardGenerator";
import { moveIndex } from "./hooks/pawn/MovePawn";
import { wallCreator } from "./constants/helper";
import { WallPanelControl } from "./hooks/helper";

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
    const direction = -1;

    const find = (boardData, ID) => boardData.find(({ _id }) => _id === ID);

    const takePawn = find(boardData, id);
    const takeDropPawn = find(boardData, drop);

    const pawnType = takePawn.type.split(" ")[0].replace(/[,]/g, "");

    if (currentPlayer !== pawnType) return;

    const pawnMoves = moveIndex(pawnType, id);
    const illegalPosition = WallPanelControl(boardData);
    const clearMove = pawnMoves.filter((el) => !illegalPosition.includes(el));

    const move = illegalPosition.includes(id) ? clearMove : pawnMoves;

    const leftWall = wallCreator(boardData, (item) => item.id % 8 === 1);
    const rightWall = wallCreator(boardData, (item) => item.id % 8 === 0);

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

    const data = BlockFinder(oneAxis, currentPlayer, boardData);

    const onlyEmptyJump = data
      .filter((el) => el.type === "")
      .map(({ id }) => id);

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

    const detectAttack = PossibleAttack.length
      ? {
          data: clearBlocker,
          jump: true,
        }
      : {
          data: move,
          jump: false,
        };

    if (
      takeDropPawn &&
      takeDropPawn.type === "" &&
      detectAttack.data.includes(drop)
    ) {
      const update = boardData.map((el) => {
        const ids = Number(el.id);
        if (ids === Number(drop)) {
          return {
            ...el,
            Img: takePawn.Img,
            type: takePawn.type,
          };
        }

        if (ids === Number(takePawn.id)) {
          return {
            ...el,
            Img: "Empty",
            type: "",
          };
        }

        return el;
      });

      setBoard(update);
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

// TODO lock move if there is a possible attack
// TODO add game over

const combineArray = (arr) =>
  arr.reduce(
    (array, isArray) => Array.isArray(isArray) && array.concat(isArray),
    []
  );

const BlockFinder = (oneAxis, currentPlayer, boardData) => {
  const blackBlocks = oneAxis
    .filter((el) => {
      const Player = el.type.split(" ")[0].replace(/[,]/g, "");

      return Player !== currentPlayer;
    })
    .filter((el) => el.type)
    .map(({ id }) => id);

  const higher = blackBlocks.map((el) => [el - 9, el, el + 9]);
  const smaller = blackBlocks.map((el) => [el + 9, el, el - 9]);
  const findEmptySpace = [...new Set(combineArray([...higher, ...smaller]))];

  const data = boardData.filter((el) => findEmptySpace.includes(el.id));

  return data;
};
