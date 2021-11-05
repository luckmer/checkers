import { Routes, Route } from 'react-router';
import { routes } from './routes/index';

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  );
};

export default App;
