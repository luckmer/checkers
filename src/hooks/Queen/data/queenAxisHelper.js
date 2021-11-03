import { axisAMoves, axisBMoves } from './QueenAxis';
import { GRID_SIZE, TOTAL_SIZE, BOARD_SIZE } from '../../../constants';

class QueenAxisHelper {
  yAxisTop = (props) => {
    const { boardData, takePawn, direction, rightWall } = props;

    const yTop = boardData.filter((item) => {
      const block = takePawn.id;
      const Item = parseFloat(item.id);
      return (
        Item % 7 === (block % 7) - direction - 1 &&
        block % GRID_SIZE >= 0 &&
        Item <= block
      );
    });

    const moveYAxis = axisBMoves(yTop, rightWall);

    return moveYAxis;
  };

  yAxisBottom = (props) => {
    const { boardData, takePawn, direction, rightWall } = props;

    const yBottom = boardData.filter((el) => {
      const id = Number(el.id);

      return (
        id % 9 === (takePawn.id % 9) - direction - 1 &&
        id >= parseFloat(takePawn.id) &&
        id
      );
    });

    const moveYAxis = axisAMoves(yBottom, rightWall);

    return moveYAxis;
  };

  xAxisBottom = (props) => {
    const { boardData, takePawn, direction, leftWall } = props;

    const XBottom = boardData.filter((item) => {
      const player = Number(takePawn.id);
      const block = Number(item.id);
      return (
        player % 7 === (block % 7) - direction - 1 &&
        block % GRID_SIZE <= TOTAL_SIZE &&
        player <= block &&
        item.id !== BOARD_SIZE
      );
    });

    const moveAxisA = axisAMoves(XBottom, leftWall);

    return moveAxisA;
  };

  xAxisTop = (props) => {
    const { boardData, direction, upJumper, takePawn } = props;

    const XTop = boardData.filter(
      (item) =>
        parseFloat(item.id) % upJumper ===
          (takePawn._id % upJumper) - direction - 1 &&
        parseFloat(item.id) <= takePawn._id
    );

    return XTop;
  };
}

const help = new QueenAxisHelper();

export default help;
