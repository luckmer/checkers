import {
  OverSection,
  OverSpacer,
  OverH1,
  OverSpan
} from '../css/GameOver.Style';

const GameOver = (winner) => {
  return (
    <OverSection>
      <OverSpacer>
        <OverH1>GAME OVER</OverH1>
      </OverSpacer>
      <OverSpacer>
        <OverH1>
          Winner:
          <OverSpan>{winner}</OverSpan>
        </OverH1>
      </OverSpacer>
    </OverSection>
  );
};

export default GameOver;
