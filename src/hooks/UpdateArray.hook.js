const updatePosition = (array, dropId, takePawn) => {
  return array.map((el) => {
    if (Number(el.id) === Number(dropId)) {
      return {
        ...el,
        Img: takePawn.Img,
        type: takePawn.type,
      };
    }

    if (Number(el.id) === Number(takePawn.id)) {
      const Type = el.type.split(" ")[1].toString();
      if (Type === "white" || Type === "black") {
        return {
          ...el,
          Img: "Empty",
          type: "",
        };
      }
    }
    if (Number(el.id) === Number(takePawn.id)) {
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
