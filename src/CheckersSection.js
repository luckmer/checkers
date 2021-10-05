import styled from "styled-components";

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
  background-color: ${({ Design }) => (Design === 1 ? "#784e19" : "#EBEBD0")};
  background-image: url(${({ IMG }) => (IMG !== "Empty" ? IMG : "")});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 60%;
`;
