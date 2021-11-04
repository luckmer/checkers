import BlackQueen from '../../../image/BlackQueen.png';
import WhiteQueen from '../../../image/whiteQueen.png';
import helper from '../../../constants/helper';

const pawnCleaner = (arr, types) =>
  arr &&
  arr
    .filter(
      ({ type }) => type && helper.queenType(type) !== helper.queenType(types)
    )
    .map(({ id }) => id);

const CreateQueen = (props) => {
  const {
    boardData,
    drop,
    takePawn,
    clearRoad,
    currentPlayer,
    oneYAxis,
    oneAxis
  } = props;

  const pawnType = takePawn.type;
  const pawnId = takePawn.id;
  const type = helper.queenType(pawnType);

  const axisY = pawnCleaner(oneYAxis, pawnType);
  const axisA = pawnCleaner(oneAxis, pawnType);

  const jumpY =
    oneYAxis && oneYAxis.map(({ id }) => id).includes(drop) && axisY;

  const jumpA = oneAxis && oneAxis.map(({ id }) => id).includes(drop) && axisA;

  const road = clearRoad?.data ? clearRoad?.data : false;

  const roadPanel =
    road &&
    road.filter((id) => {
      return clearRoad.arr === 'more'
        ? id > drop && id < pawnId
        : id < drop && id > pawnId;
    });

  const findEnemy =
    roadPanel &&
    boardData
      .filter(({ id }) => roadPanel.includes(id))
      .filter(({ type }) => type && helper.queenType(type) !== currentPlayer)
      .map(({ id }) => id);

  const detectEnemy =
    roadPanel && roadPanel.some((el) => findEnemy.includes(el));

  return boardData.map((el) => {
    const id = Number(el._id);
    const img = type === 'white' ? WhiteQueen : BlackQueen;

    if (!pawnType.includes('Queen')) {
    }

    if (id === Number(drop)) {
      return { ...el, type: `${type}Queen, ${type}`, Img: img };
    }

    if (roadPanel.length) {
      if (roadPanel.includes(id) && detectEnemy) {
        return { ...el, Img: 'Empty', type: '' };
      }
    }

    if (
      id === Number(takePawn.id) ||
      (jumpY && jumpY?.includes(id)) ||
      (jumpA && jumpA?.includes(id))
    ) {
      return { ...el, Img: 'Empty', type: '' };
    }

    return el;
  });
};

export default CreateQueen;
