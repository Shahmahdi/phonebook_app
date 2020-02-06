import React from 'react';
import { Popover, Position, Button, Intent } from '@blueprintjs/core';
import { ContactForm } from './Form';
import { connect } from 'react-redux';

const HeaderComponent = (props: {
  totalContacts?: number;
}) => (
    <div className="bg-black-10 fl pa3 pb1 w-100">
      <div
        className="fl w-50 w-60-ns"
        style={{ lineHeight: '20px' }}
      >
        <p className="fw5 mb0 f4">Phone List</p>
        <p className="fw4 mb0 f5 i"><small>Total: {props.totalContacts}</small></p>
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
              style={{ border: '1px solid' }}
            />
          }
        />
      </div>
    </div>
  );

const mapStateToProps = (state: any) => {
  return {
    totalContacts: state.contactReducer.contacts.length
  };
}

export const Header = connect(mapStateToProps, null)(HeaderComponent);