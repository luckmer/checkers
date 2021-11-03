class Helper {
  wallCreator = (DATA, POS) => DATA.filter(POS).map((el) => el._id);

  find = (boardData, ID) => boardData.find(({ _id }) => _id === ID);

  dataFinder = (arr, finder) => arr.find(finder);

  TargetType = (TYPE, POS) => TYPE && TYPE.split(' ')[POS].replace(/[,]/g, '');

  getArrayEdges = (arr, start, end) =>
    arr.filter((el) => el._id >= start && el._id <= end).map((el) => el._id);

  values = (arr) => arr.map(({ id }) => id);

  blackAxis = (arr, pawn, jump) => arr.filter((el) => el > pawn && el < jump);

  whiteAxis = (arr, pawn, jump) => arr.filter((el) => el < pawn && el > jump);

  wallDetector = (arr, element) => {
    if (!arr) return undefined;

    return arr.filter(element).map(({ id }) => id)[0];
  };

  pawnType = (type) => type.split(' ')[0].replace(/[,]/g, '');

  queenType = (type) =>
    type.includes('Queen')
      ? type.split(' ').pop()
      : type.split(' ')[0].replace(/[,]/g, '');

  checkArrays = (arr, tester) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < tester.length; j++) {
        if (arr[i] === tester[j]) {
          return true;
        }
      }
    }
    return false;
  };

  combineArray = (arr) =>
    arr.reduce(
      (array, isArray) => Array.isArray(isArray) && array.concat(isArray),
      []
    );
}

const helper = new Helper();

export default helper;
