import React from 'react';
import {Navbar, Alignment} from '@blueprintjs/core';

const App = () => {
  return (
    <div>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Phonebook</Navbar.Heading>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default App;
