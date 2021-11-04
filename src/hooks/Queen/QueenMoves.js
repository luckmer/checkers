import ControlQueen from './ControlQueen';

const QueenMovesArray = (props) => {
  const { XCheckTop, YCheckBottom, YCheckTop, XCheckBottom } = ControlQueen({
    ...props
  });

  const moves = [
    { arr: 'more', option: XCheckTop, data: XCheckTop.data, axis: 'less' },
    {
      arr: 'less',
      option: YCheckBottom,
      data: YCheckBottom.data,
      axis: 'less'
    },
    { arr: 'more', option: YCheckTop, data: YCheckTop.data, axis: 'more' },
    {
      arr: 'less',
      option: XCheckBottom,
      data: XCheckBottom.data,
      axis: 'less'
    }
  ];
  return moves;
};

export default QueenMovesArray;
