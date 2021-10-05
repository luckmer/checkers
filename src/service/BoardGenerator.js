import { useState, useEffect, useMemo } from "react";
import boardMap from "./Board";

const ChessMapGenerator = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const boardSize = 8;
    let index = 0;
    let black = false;

    const box = [];

    for (let i = 1; i <= boardSize ** 2; i++) {
      let IdColor = null;
      if (black) {
        IdColor = 1;
        index++;
        black = !black;
      } else {
        IdColor = 0;
        index++;
        black = !black;
      }

      const grid = {
        id: i,
        _id: i,
        background: IdColor,
        Img: boardMap[i - 1][0],
        type: boardMap[i - 1][1],
      };
      box.push(grid);
      if (index === 8) {
        black = !black;
        index = 0;
      }
    }
    setBoard(box);
  }, []);

  const boardData = useMemo(() => board, [board]);

  return { boardData, setBoard };
};

export default ChessMapGenerator;
