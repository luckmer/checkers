class Move {
  xCheckTopBlack = (props) => {
    const { boardData, direction, upJumper, takePawn } = props;

    return boardData.filter(
      (item) =>
        parseFloat(item.id) % upJumper ===
          (takePawn._id % upJumper) - direction - 1 &&
        parseFloat(item.id) >= takePawn._id
    );
  };

  xCheckTopWhite = (props) => {
    const { boardData, direction, upJumper, takePawn } = props;

    return boardData.filter(
      (item) =>
        parseFloat(item.id) % upJumper ===
          (takePawn._id % upJumper) - direction - 1 &&
        parseFloat(item.id) <= takePawn._id
    );
  };

  yCheckTopBlack = (props) => {
    const { boardData, takePawn, downJumper, direction, nextRow } = props;

    return boardData.filter((item) => {
      const Item = Number(item.id);
      return (
        Item % downJumper === (takePawn.id % downJumper) - direction - 1 &&
        takePawn.id % nextRow >= 0 &&
        Item >= takePawn.id
      );
    });
  };

  yCheckTopWhite = (props) => {
    const { boardData, takePawn, downJumper, direction, nextRow } = props;

    return boardData.filter((item) => {
      const Item = Number(item.id);
      return (
        Item % downJumper === (takePawn.id % downJumper) - direction - 1 &&
        takePawn.id % nextRow >= 0 &&
        Item <= takePawn.id
      );
    });
  };

  wallCollision = (arr, wall) =>
    arr.filter((el) => wall.includes(el.id)).map(({ id }) => id)[0];
}

const move = new Move();

export default move;
