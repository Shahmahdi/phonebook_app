import React, { useEffect } from 'react';
import { Navbar, Button, Intent, Card, InputGroup, Popover, Position } from '@blueprintjs/core';
import { ContactForm } from './components/Form';
import { ContactList } from './components/List';
import { connect } from 'react-redux';
import { getAllContacts, searchContacts } from './stores/contact/Actions';

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
          <div className="bg-black-10 fl pa3 pb1 w-100">
            <div
              className="fl w-50 w-60-ns"
              style={{ lineHeight: '20px' }}
            >
              <p className="fw5 mb0 f4">Phone List</p>
              <p className="fw4 mb0 f5 i"><small>Total: 20</small></p>
            </div>
            <div className="fl w-50 w-40-ns">
              <Popover
                className="fr"
                position={Position.LEFT_BOTTOM}
                content={
                  <ContactForm />
                }
                target={
                  <Button
                    icon="new-object"
                    text="Add Contact"
                    intent={Intent.SUCCESS}
                    minimal={true}
                    style={{border: '1px solid'}}
                  />
                }
              />
            </div>
          </div>

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
