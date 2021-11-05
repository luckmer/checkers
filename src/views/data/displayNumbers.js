import { Numbers, Spacer } from '../../css/CheckersSection.Style';

const DisplayNumbers = () => {
  const numbers = new Array(8).fill(0).map((_, i) => i + 1);

  return (
    <Numbers>
      {numbers.map((el) => (
        <Spacer key={el}>
          <p>{el}</p>
        </Spacer>
      ))}
    </Numbers>
  );
};
export default DisplayNumbers;
