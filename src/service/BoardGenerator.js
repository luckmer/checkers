import { useState, useEffect, useMemo } from 'react';
import Generator from './Generator';

const ChessMapGenerator = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const box = Generator();
    setBoard(box);
  }, []);

  const boardData = useMemo(() => board, [board]);

  return { boardData, setBoard };
};

export default ChessMapGenerator;
