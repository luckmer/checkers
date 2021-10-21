export const axisBMoves = (arr, wall) => {
  const ids = arr.map(({ id }) => id);

  const findCollision = ids.find((id) => wall.includes(id));

  const moveYAxis = findCollision
    ? arr.filter((el) => el.id >= findCollision)
    : arr;

  return moveYAxis;
};

export const axisAMoves = (arr, wall) => {
  const ids = arr.map(({ id }) => id);

  const findCollision = ids.find((id) => wall.includes(id));

  const moveXAxis = findCollision
    ? arr.filter(({ id }) => id <= findCollision)
    : arr;

  return moveXAxis;
};
