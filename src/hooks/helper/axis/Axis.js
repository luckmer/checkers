const Axis = (
  boardData,
  takePawn,
  direction,
  leftWall,
  rightWall,
  currentPlayer
) => {
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

  return oneAxis;
};

export default Axis;
