import styled from 'styled-components';

export const CheckersSection = styled.section`
  width: auto;
  height: 600px;
  display: flex;
  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 600px;
    width: auto;
    grid-template-columns: repeat(8, 75px);
    grid-template-rows: repeat(8, 75px);
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 400px;
    width: auto;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 240px;
    width: auto;
    grid-template-columns: repeat(8, 30px);
    grid-template-rows: repeat(8, 30px);
  }
`;
export const Div = styled.div`
  background-color: ${({ Design }) => (Design === 1 ? '#759652' : '#EBEBD0')};
  background-image: url(${({ IMG }) => (IMG !== 'Empty' ? IMG : '')});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 60%;

  padding-left: 2px;

  box-shadow: rgb(0 0 0 / 19%) 0px 0px 10px 5px inset;
  transition: background-color 350ms cubic-bezier(0.65, 0.05, 1, 0.8) 0s;

  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 75px;
    width: 75px;
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 50px;
    width: 50px;
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 30px;
    width: 30px;
  }
`;

export const Span = styled.span`
  color: #ebebd0;
`;

export const Nav = styled.nav`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 20px 10px 20px;
  color: grey;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;

  a {
    list-style: none;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  border-radius: 20px;
  margin-top: 20px;
  padding: 10px;
  background: none;
  color: #fff;
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: grey;
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  border: 1px solid #17181b;
  cursor: pointer;
  &:hover {
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px #427388;
  }

  // position: relative;
  // padding: 1.4rem 4.2rem;
  // padding-right: 3.1rem;
  // font-size: 1.4rem;
  // color: #fff;
  // letter-spacing: 1.1rem;
  // text-transform: uppercase;
  // transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);
  // cursor: pointer;
  // user-select: none;
  // background: none;
  // &:before,
  // &:after {
  //   content: '';
  //   position: absolute;
  //   transition: inherit;
  //   z-index: -1;
  // }

  // &:hover {
  //   color: #96b7c4;
  //   transition-delay: 0.5s;
  // }

  // &:hover:before {
  //   transition-delay: 0s;
  // }

  // &:hover:after {
  //   background: #fff;
  //   transition-delay: 0.35s;
  // }
`;

export const Spacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 75px;
    width: 75px;
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 50px;
    width: 50px;
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 30px;
    width: 30px;
  }
`;

export const BoardDataSpacer = styled.div`
  display: flex;
  flex-flow: row wrap;

  @media screen and (min-width: 689px), screen and (min-height: 689px) {
    height: 600px;
    width: 600px;
    grid-template-columns: repeat(8, 75px);
    grid-template-rows: repeat(8, 75px);
  }

  @media screen and (max-width: 689px), screen and (max-height: 689px) {
    height: 400px;
    width: 400px;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
  }

  @media screen and (max-width: 472px), screen and (max-height: 472px) {
    height: 240px;
    width: 240px;
    grid-template-columns: repeat(8, 30px);
    grid-template-rows: repeat(8, 30px);
  }
`;

export const DataSpacer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Numbers = styled.div`
  color: white;
`;

export const Letters = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;
