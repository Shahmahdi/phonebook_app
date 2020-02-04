import React from 'react';
import { Navbar, Button, Intent, Card, InputGroup, Popover, Position } from '@blueprintjs/core';
import { ContactForm } from './components/Form';
import { ContactList } from './components/List';

const ContactInfos = [
  {
    name: 'mahdi',
    phone: '01789123123'
  },
  {
    name: 'mahdi',
    phone: '01789123123'
  },
  {
    name: 'mahdi',
    phone: '01789123123'
  },
  {
    name: 'mahdi',
    phone: '01789123123'
  },
  {
    name: 'mahdi',
    phone: '01789123123'
  },
]

const App = () => {
  return (
    <div>
      <Navbar className="flex justify-center" fixedToTop={true}>
        <Navbar.Group>
          <div className="f3 fw6 i">Phonebook</div>
        </Navbar.Group>
      </Navbar>
      <Card
        className="cf flex w-50-l w-75-m w-100"
        style={{ margin: '75px auto 30px', minHeight: '85vh' }}
      >
        <div className="fl w-100">
          <div className="fl w-100  pb1">
            <div
              className="fl w-75"
              style={{ lineHeight: '20px' }}
            >
              <p className="fw5 mb0 f4">Phone List</p>
              <p className="fw4 mb0 f5 i"><small>Total: 20</small></p>
            </div>
            <div className="fl w-25">
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
                  />
                }
              />
            </div>
          </div>

          <div className="fl w-100">
            <InputGroup
              fill={true}
              leftIcon="search"
              onChange={(e: any) => console.log(e.target.value)}
              placeholder="e.g. 017********"
              type="number"
              round={true}
            />
          </div>

          <div className="fl w-100">
            <ContactList contacts={ContactInfos} />
          </div>

        </div>
      </Card>

    </div>
  );
}

export default App;
