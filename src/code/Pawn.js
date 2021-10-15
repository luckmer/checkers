// import PawnHelper from "./PawnHelper";
// import { CreateQueen, updatePosition } from "../../service";
// import { getArrayEdges } from "../../constants/helper";
// import { WallPanelControl } from "../helper/index";
// import { TargetType } from "../../constants/helper";
// import { moveIndex } from "./MovePawn";
// import { useEffect } from "react";

// const WallCreator = (DATA, POS) =>
//   DATA.filter((item) => item.id % 8 === POS).map((el) => el.id);

// const XTopPanel = () => {};

// const Pawn = ({
//   boardData,
//   type,
//   pawnID,
//   dropId,
//   takeBlock,
//   takePawn,
//   setBoard,
//   setCurrentPlayer,
//   currentPlayer,
// }) => {
//   // const { attack, killedPawn } = PawnHelper(boardData, type, pawnID, dropId);

//   const illegalPosition = WallPanelControl(boardData);

//   const movePawn = moveIndex(type, pawnID);

//   const clearMove = movePawn.filter((el) => !illegalPosition.includes(el));

//   const move = illegalPosition.includes(pawnID) ? clearMove : movePawn;

//   //-----------------------------------------------------------------------------
//   const attackPosition = boardData
//     .filter((el) => move.includes(el._id))
//     .map((el) => {
//       const ID = el.id;
//       const calcWhite = ~~(pawnID - ID);
//       const calcBlack = ~~(ID - pawnID + ID);
//       let test = TargetType(el.type, 0);
//       const controlType = type === "white" ? ID - calcWhite : calcBlack;

//       if (el.Img !== "Empty" && type !== test && dropId === controlType) {
//         const result = { id: controlType, killed: ID, killedImg: el.Img };

//         return result;
//       }

//       return { id: ID };
//     });

//   const attack = attackPosition.map((el) => el.id);
//   const killedPawn = attackPosition.find((el) => el?.killed);

//   //---------------------------

//   const direction = -1;
//   const XCheckTop = boardData
//     .filter(
//       (item) =>
//         parseFloat(item.id) % 9 === (takePawn._id % 9) - direction - 1 &&
//         parseFloat(item.id) < takePawn._id
//     )
//     .map((el) => {
//       const ID = el.id;
//       const calcWhite = ~~(pawnID - ID);
//       const calcBlack = ~~(ID - pawnID + ID);
//       let test = TargetType(el.type, 0);
//       const controlType = type === "white" ? ID - calcWhite : calcBlack;

//       if (type !== test && dropId === controlType) {
//         const result = { id: controlType, killed: ID, killedImg: el.Img };

//         return result;
//       }

//       return { id: ID };
//     });

//   //---------------------------

//   const fromRight = 0;
//   const toRight = 8;
//   const fromLeft = 57;
//   const toLeft = 64;

//   const blackWall = getArrayEdges(boardData, fromRight, toRight);
//   const whiteWall = getArrayEdges(boardData, fromLeft, toLeft);

//   //-----------------------------------------------------------------------------
//   if (takeBlock && takeBlock.type === "" && attack.includes(dropId)) {
//     const props = { boardData, dropId, takePawn, killedPawn, type };

//     const Update =
//       (blackWall.includes(dropId) && type !== "Queen") ||
//       (whiteWall.includes(dropId) && type !== "Queen")
//         ? CreateQueen(props)
//         : updatePosition(props);

//     setBoard(Update);

//     // setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
//   }
// };
// export default Pawn;
