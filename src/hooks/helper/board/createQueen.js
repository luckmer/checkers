import BlackQueen from '../../../image/BlackQueen.png';
import WhiteQueen from '../../../image/whiteQueen.png';
import { queenType } from '../../../constants/helper';

const CreateQueen = (props) => {
  const { boardData, drop, takePawn, clearRoad, currentPlayer } = props;

  const type = queenType(takePawn.type);

  const road = clearRoad?.data ? clearRoad?.data : false;

  const roadPanel =
    road &&
    road.filter((id) => {
      return clearRoad.axis === 'more'
        ? id > drop && id < takePawn.id
        : id < drop && id > takePawn.id;
    });

  const findEnemy =
    roadPanel &&
    boardData
      .filter(({ id }) => roadPanel.includes(id))
      .filter(({ type }) => type && queenType(type) !== currentPlayer)
      .map(({ id }) => id);

  const detectEnemy =
    roadPanel && roadPanel.some((el) => findEnemy.includes(el));

  return boardData.map((el) => {
    const id = Number(el._id);
    const img = type === 'white' ? WhiteQueen : BlackQueen;

    if (id === Number(drop)) {
      return { ...el, type: `${type}Queen, ${type}`, Img: img };
    }

    if (roadPanel.length) {
      if (roadPanel.includes(id) && detectEnemy) {
        return { ...el, Img: 'Empty', type: '' };
      }
    }

    if (id === Number(takePawn.id)) {
      return { ...el, Img: 'Empty', type: '' };
    }

    return el;
  });
};

export default CreateQueen;
