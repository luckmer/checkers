import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../css/CheckersSection.Style';
import * as _ from '../css/Help.Style';

const Help = () => {
  const content = [
    {
      header: 'MOBILE',
      desc: 'APLLICATION DO NOT SUPPORT PHONES'
    },
    {
      header: 'COMPUTER',
      desc: 'TO PLAY ON THE COMPUTER, GRAB THE PAWN OF YOUR CHOICE AND MOVE IT TO THE DESIRED PERMITTED LOCATION  '
    }
  ];

  return (
    <_.Section>
      <_.Nav>
        <_.NavDiv>
          <div>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </div>
        </_.NavDiv>
      </_.Nav>
      <_.Description>
        <div>
          <Button>HOW TO PLAY</Button>
        </div>
      </_.Description>
      <_.HelpContainer>
        {content.map((el, i) => (
          <_.Mobile key={i}>
            <_.Description>
              <div>
                <h1>{el.header}</h1>
              </div>
            </_.Description>
            <_.MobileContent>
              <_.DivHeader>
                <_.MobileHeader>{el.desc}</_.MobileHeader>
              </_.DivHeader>
            </_.MobileContent>
          </_.Mobile>
        ))}
      </_.HelpContainer>
    </_.Section>
  );
};

export default Help;
