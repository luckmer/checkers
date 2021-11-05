import styled from 'styled-components';

export const Section = styled.section`
  max-width: 1200px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Nav = styled.nav`
  width: 100%;
  height: auto;
`;

export const NavDiv = styled.div`
  padding: 20px;
  text-align: right;
`;

export const NavP = styled.p`
Font family: Roboto;
  
  font-weight:bold;
  letter-spacing: 1.2px;
  line-height: 0.8;
  a{
    cursor:pointer;
    color:#2a9d8f;
    text-decoration:none;
  }
`;

export const HelpContainer = styled.section`
  padding-top: 5vh;
  width: 100%;
  height: 100%;
  display: flex;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`;

export const Description = styled.section`
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  color: #2a9d8f;
  &&:nth-child(2) {
    justify-content: flex-start;
  }
  div {
    text-align: center;
    min-width: 150px;
  }
  @media screen and (max-width: 540px) {
    padding-bottom: 30px;
  }
`;

export const Mobile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (max-width: 540px) {
    width: 100%;
    height: 100vh;
  }
`;

export const MobileContent = styled.div`
  padding-top: 5%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MobileHeader = styled.header`
  word-break: break-word;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  color: #ffffff;
  border-left: 1px solid white;
  @media screen and (min-width: 540px) {
    padding-top: 10px;
    padding-left: 40px;
  }
  @media screen and (max-width: 540px) {
    padding: 20px;
    display: flex;
    align-items: center;
  }
`;

export const MobileMove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
    min-height: 300px;
  }
`;

export const DivHeader = styled.div`
  width: 100%;
  height: auto;
`;
