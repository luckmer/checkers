const moveQueen = (queenId) => {
  const right = 9;
  const left = 7;

  return [queenId + left, queenId + right, queenId - right, queenId - left];
};

export default moveQueen;
