import { Letters, Spacer } from '../../css/CheckersSection.Style';

const DisplayLetters = () => {
  const letters = new Array(8)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i));

  return (
    <Letters>
      <Spacer />
      {letters.map((el) => (
        <Spacer key={el}>
          <p>{el}</p>
        </Spacer>
      ))}
    </Letters>
  );
};

export default DisplayLetters;
