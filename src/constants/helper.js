export const wallCreator = (DATA, POS) => DATA.filter(POS).map((el) => el._id);

export const find = (boardData, ID) => boardData.find(({ _id }) => _id === ID);

export const dataFinder = (arr, finder) => arr.find(finder);

export const TargetType = (TYPE, POS) =>
  TYPE && TYPE.split(' ')[POS].replace(/[,]/g, '');

export const getArrayEdges = (arr, start, end) =>
  arr.filter((el) => el._id >= start && el._id <= end).map((el) => el._id);

export const values = (arr) => arr.map(({ id }) => id);

export const blackAxis = (arr, pawn, jump) =>
  arr.filter((el) => el > pawn && el < jump);

export const whiteAxis = (arr, pawn, jump) =>
  arr.filter((el) => el < pawn && el > jump);

export const wallDetector = (arr, element) => {
  if (!arr) return undefined;

  return arr.filter(element).map(({ id }) => id)[0];
};

export const pawnType = (type) => type.split(' ')[0].replace(/[,]/g, '');

export const queenType = (type) =>
  type.split(' ')[0].replace(/[,]/g, ' ').split(' ').pop();

export const checkArrays = (arr, tester) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < tester.length; j++) {
      if (arr[i] === tester[j]) {
        return true;
      }
    }
  }
  return false;
};

export const combineArray = (arr) =>
  arr.reduce(
    (array, isArray) => Array.isArray(isArray) && array.concat(isArray),
    []
  );
