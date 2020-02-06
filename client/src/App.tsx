import React, { useEffect } from 'react';
import { Navbar, Card, InputGroup } from '@blueprintjs/core';
import { ContactList } from './components/List';
import { connect } from 'react-redux';
import { getAllContacts, searchContacts } from './stores/contact/Actions';
import { Header } from './components/Header';

const AppComponent = (props: {
  getAllContacts: () => void;
  searchContacts: (value: string) => void;
}) => {
  
  useEffect(() => {
    props.getAllContacts();
  }, [props])

  return (
    <div>
      <Navbar className="bp3-dark flex justify-center" fixedToTop={true}>
        <Navbar.Group>
          <div className="f3 fw6 i">Phonebook</div>
        </Navbar.Group>
      </Navbar>
      <Card
        className="cf flex w-50-l w-75-m w-100"
        style={{ margin: '75px auto 30px', minHeight: '85vh', padding: '0px' }}
      >
        <div className="fl w-100">
          <Header />

          <div className="fl w-100 pa2">
            <InputGroup
              fill={true}
              leftIcon="search"
              onChange={(e: any) => {
                props.searchContacts(e.target.value);
              }}
              placeholder="e.g. 017********"
              type="number"
              round={true}
            />
          </div>

          <div className="fl w-100">
            <ContactList />
          </div>

        </div>
      </Card>
    </div>
  );
}

const App = connect(null, { getAllContacts, searchContacts })(AppComponent);

export default App;
