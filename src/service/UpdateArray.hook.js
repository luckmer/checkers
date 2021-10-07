const updatePosition = (props) => {
  const { boardData, dropId, takePawn, killedPawn } = props;

  const killedPawnId = killedPawn?.killed;

  return boardData.map((el) => {
    const id = Number(el.id);

    if (id === Number(dropId)) {
      return {
        ...el,
        Img: takePawn.Img,
        type: takePawn.type,
      };
    }

    if (id === killedPawnId) {
      return {
        ...el,
        Img: "Empty",
        type: "",
      };
    }

    if (id === Number(takePawn.id)) {
      const Type = el.type.split(" ")[1].toString();
      if (Type === "white" || Type === "black") {
        return {
          ...el,
          Img: "Empty",
          type: "",
        };
      }
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

export default updatePosition;
