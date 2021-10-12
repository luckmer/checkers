"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = require("../hooks/helper");

var DropHelper = function DropHelper(props) {
  var e = props.e,
      boardData = props.boardData,
      currentPlayer = props.currentPlayer,
      setBoard = props.setBoard,
      setCurrentPlayer = props.setCurrentPlayer;
  var id = e.dataTransfer.getData("id");
  var grabbedAsNumber = Number(id);
  var dropId = Number(e.target.id);

  var _finderDataType = (0, _helper.finderDataType)(boardData, dropId, grabbedAsNumber),
      takeBlock = _finderDataType.takeBlock,
      takePawn = _finderDataType.takePawn;

  var _targetDataType = (0, _helper.targetDataType)(takeBlock, takePawn),
      type = _targetDataType.type,
      FindTargetType = _targetDataType.FindTargetType;

  var pawnID = takePawn.id;
  var arrCenter = type.length / 2;
  var moveType = type.includes("Queen") ? type.slice(0, arrCenter) : type;
  var checkPlayer = currentPlayer === moveType;
  var DifferentColor = moveType !== FindTargetType;
  var MOVE = checkPlayer && DifferentColor;
  var PROPS = {
    boardData: boardData,
    type: type,
    pawnID: pawnID,
    dropId: dropId,
    takeBlock: takeBlock,
    takePawn: takePawn,
    setBoard: setBoard,
    setCurrentPlayer: setCurrentPlayer,
    currentPlayer: currentPlayer
  };
  return {
    PROPS: PROPS,
    MOVE: MOVE,
    type: type
  };
};

var _default = DropHelper;
exports["default"] = _default;