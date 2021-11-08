import { GRID_SIZE } from '../../constants';

export const moveIndex = (type, pawnID) =>
  type === 'white'
    ? [pawnID - GRID_SIZE - 1, pawnID - GRID_SIZE + 1]
    : [pawnID + GRID_SIZE - 1, pawnID + GRID_SIZE + 1];
