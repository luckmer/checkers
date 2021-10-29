import BlackQueen from '../../../image/BlackQueen.png';
import WhiteQueen from '../../../image/whiteQueen.png';
import { queenType } from '../../../constants/helper';

const CreateQueen = (props) => {
  const { boardData, drop, takePawn } = props;

  const type = queenType(takePawn.type);

  return boardData.map((el) => {
    const id = Number(el._id);

    if (id === Number(drop)) {
      return {
        ...el,
        type: `${type}Queen, ${type}`,
        Img: type === 'white' ? WhiteQueen : BlackQueen
      };
    }

    if (id === Number(takePawn.id)) {
      return {
        ...el,
        Img: 'Empty',
        type: ''
      };
    }

    return el;
  });
};

export default CreateQueen;
