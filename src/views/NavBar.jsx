import { Span, Nav, NavDiv, Button } from '../css/CheckersSection.Style';

import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const { currentPlayer, handleRestartGame } = props;

  return (
    <Nav>
      <NavDiv>
        <p>
          Current Player: <Span>{currentPlayer}</Span>
        </p>
        <Button onClick={handleRestartGame}>restart game</Button>
      </NavDiv>
      <div>
        <Link to="*">
          <Button>Home</Button>
        </Link>
      </div>
    </Nav>
  );
};

export default NavBar;
