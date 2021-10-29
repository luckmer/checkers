import BlackQueen from '../../../image/BlackQueen.png';
import WhiteQueen from '../../../image/whiteQueen.png';

import { pawnType } from '../../../constants/helper';

const CreateQueen = (props) => {
  const { boardData, drop, takePawn } = props;

  const type = pawnType(takePawn.type);

  return boardData.map((el) => {
    const id = Number(el._id);
    const Type = takePawn.type.split(' ');
    const color = Type.shift().replace(/,/g, '');

    if (id === Number(drop)) {
      return {
        ...el,
        type: `${color}Queen, ${type}`,
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
