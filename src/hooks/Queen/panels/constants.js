import helper from '../../../constants/helper';

class Constants {
  equalGenerator = (equalPlayer, takePawn) => {
    return equalPlayer
      .filter(
        ({ type }) => helper.queenType(type) === helper.queenType(takePawn.type)
      )
      .map(({ id }) => id)
      .shift();
  };

  typeFilter = (correctData) => {
    return correctData.map(({ type }) => type).every((index) => index === '');
  };

  moveCutter = (correctMove, takePawn) => {
    return correctMove
      .filter(
        ({ type }) =>
          type !== '' &&
          helper.queenType(type) !== helper.queenType(takePawn.type)
      )
      .pop()?.id;
  };

  typeFinder = (moveAxisA, takePawn) => {
    return moveAxisA.filter(
      ({ type, id }) => id !== takePawn.id && type === ''
    );
  };

  moveGenerator = (moveAxisA, takePawn) => {
    return moveAxisA
      .filter(
        ({ type, id }) =>
          id !== takePawn.id &&
          helper.queenType(type) === helper.queenType(takePawn.type)
      )
      .map(({ id }) => id)
      ?.shift();
  };

  idGenerator = (displayMove) => displayMove.map(({ id }) => id);

  motionTransmitter = (xTopAxis, takePawn) => {
    return xTopAxis
      .filter(
        ({ type, id }) =>
          id !== takePawn.id &&
          helper.queenType(type) === helper.queenType(takePawn.type)
      )
      .shift()?.id;
  };

  moveTopGenerator = (YAxis, takePawn) => {
    return YAxis.filter(
      ({ type, id }) =>
        id !== takePawn.id &&
        helper.queenType(type) === helper.queenType(takePawn.type)
    )
      .map(({ id }) => id)
      ?.pop();
  };

  equalTopGenerator = (equalPlayer, takePawn) => {
    return equalPlayer
      .filter(
        (el) => helper.queenType(el.type) === helper.queenType(takePawn.type)
      )
      .map(({ id }) => id)
      .pop();
  };

  moveTopCutter = (correctMove, takePawn) => {
    return correctMove
      .filter(
        ({ type }) =>
          type !== '' &&
          helper.queenType(type) !== helper.queenType(takePawn.type)
      )
      .shift()?.id;
  };
}

const constants = new Constants();

export default constants;
