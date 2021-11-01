import styled from 'styled-components';

export const CheckersSection = styled.main`
  background-color: #1e2028;
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 610px;
  width: 610px;
  width: auto;
  height: auto;
  margin: auto;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(8, 75px);
  grid-template-rows: repeat(8, 75px);
  grid-auto-flow: row;
`;
export const Div = styled.div`
  height: 75px;
  width: 75px;
  background-color: ${({ Design }) => (Design === 1 ? '#759652' : '#EBEBD0')};
  background-image: url(${({ IMG }) => (IMG !== 'Empty' ? IMG : '')});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 60%;

  box-shadow: rgb(0 0 0 / 19%) 0px 0px 10px 5px inset;
  transition: background-color 350ms cubic-bezier(0.65, 0.05, 1, 0.8) 0s;
`;
