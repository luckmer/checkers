import Checkers from '../views/checkers';
import Home from '../views/Home';
import IncorrectPage from '../views/404';
import Help from '../views/help';

export const routes = [
  { path: '', Element: Home },
  { path: '/game', Element: Checkers },
  { path: '/help', Element: Help },
  { path: '*', Element: IncorrectPage }
];
