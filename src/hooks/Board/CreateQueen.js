import BlackQueen from "../../image/BlackQueen.png";
import WhiteQueen from "../../image/whiteQueen.png";

const CreateQueen = (props) => {
  const { boardData, dropId, takePawn, type } = props;

  return boardData.map((el) => {
    const id = Number(el._id);
    const Type = takePawn.type.split(" ");
    const color = Type.shift().replace(/,/g, "");

    if (id === Number(dropId)) {
      return {
        ...el,
        type: `${color}Queen, ${takePawn.type}`,
        Img: type === "white" ? WhiteQueen : BlackQueen,
      };
    }

    if (id === Number(takePawn.id)) {
      return {
        ...el,
        Img: "Empty",
        type: "",
      };
    }

    return el;
  });
};

export default CreateQueen;
