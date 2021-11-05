import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  user-select: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none;
  

}


body {
    background-color: #17181b;
  }

`;

export default GlobalStyle;
