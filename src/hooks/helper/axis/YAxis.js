import BlockFinder from "../board/blockFinder";
import { wallDetector } from "../../../constants/helper";
import { direction, downJumper, nextRow } from "../../../constants";

const YAxis = (props) => {
  const { boardData, takePawn, rightWall, leftWall, currentPlayer } = props;

  const YCheckTopWhite = boardData.filter((item) => {
    const Item = Number(item.id);
    return (
      Item % downJumper === (takePawn.id % downJumper) - direction - 1 &&
      takePawn.id % nextRow >= 0 &&
      Item <= takePawn.id
    );
  });

  const YTopWallCollision = wallDetector(YCheckTopWhite, (el) =>
    rightWall.includes(el.id)
  );

  const YTopWall = YCheckTopWhite.filter((el) =>
    !YTopWallCollision ? el : el.id >= YTopWallCollision
  );

  const YCheckTopBlack = boardData.filter((item) => {
    const Item = Number(item.id);
    return (
      Item % downJumper === (takePawn.id % downJumper) - direction - 1 &&
      takePawn.id % nextRow >= 0 &&
      Item >= takePawn.id
    );
  });

  const YBlackWallCollision = wallDetector(YCheckTopBlack, (el) =>
    leftWall.includes(el.id)
  );

  const YBlackWall = YCheckTopBlack.filter((el) =>
    !YBlackWallCollision ? el : el.id <= YBlackWallCollision
  );

  const oneYAxis = currentPlayer === "white" ? YTopWall : YBlackWall;

  const properties = BlockFinder(
    oneYAxis,
    currentPlayer,
    boardData,
    downJumper
  );

  const switchCleaner =
    currentPlayer === "white" ? YTopWallCollision : YBlackWallCollision;

  return { switchCleaner, properties, oneYAxis };
};

export default YAxis;
