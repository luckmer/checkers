import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './css/Global.Style';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyle />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
