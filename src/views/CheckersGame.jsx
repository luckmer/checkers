import { DisplayNumbers, DisplayLetters } from './data/index';
import {
  CheckersSection,
  Div,
  DataSpacer,
  BoardDataSpacer
} from '../css/CheckersSection.Style';

const CheckersGame = (props) => {
  const { boardData, handleDragOver, handleDragStart, handleDrop } = props;
  return (
    <DataSpacer>
      <CheckersSection>
        <DisplayNumbers />
        <BoardDataSpacer>
          {boardData.map((el, i) => {
            const check = el.Img === 'Empty';
            return (
              <Div
                key={i}
                type={el.type}
                id={el.id}
                onDragOver={(e) => handleDragOver(e)}
                onDragStart={(e) => (check ? null : handleDragStart(e))}
                onDrop={(e) => handleDrop(e)}
                Design={el.background}
                IMG={el.Img}
                draggable={check ? null : true}
              />
            );
          })}
        </BoardDataSpacer>
      </CheckersSection>
      <DisplayLetters />
    </DataSpacer>
  );
};
export default CheckersGame;
