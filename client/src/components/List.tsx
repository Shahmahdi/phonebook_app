import React from 'react'
import { Popover, Position, Button, Intent, Menu, MenuItem } from '@blueprintjs/core'
import { ContactForm } from './Form'
import { IContact } from '../stores/contact/Reducer'
import { connect } from 'react-redux'
import { deleteContact } from '../stores/contact/Actions'

const ContactListComponent = (props: {
  contacts?: IContact[];
  deleteContact: (contact: IContact) => void;
}) => {
  return (
    <ul className="pl0 mt0">
      {props.contacts && props.contacts.length > 0 ? props.contacts.map((contactInfo, i) => (
        <li
          key={contactInfo._id}
          className={`flex items-center lh-copy pa3 ph0-l ${props.contacts!.length - 1 !== i ? 'bb b--black-10' : ''}`}
        >
          <div className="pl3 flex-auto">
            <div className="db f4 f5 fw4">{contactInfo.name}</div>
            <div className="black-70 f6">{contactInfo.phoneNumber}</div>
          </div>
          <div>
            <Popover
              position={Position.BOTTOM}
              content={
                <ContactForm
                  contactInfo={contactInfo}
                  edit={true}
                />
              }
              target={
                <Button
                  icon="edit"
                  text="Edit"
                  intent={Intent.WARNING}
                  minimal={true}
                />
              }
            />

            <Popover
              content={
                <Menu>
                  <MenuItem
                    icon="confirm"
                    text="Confirm"
                    intent={Intent.DANGER}
                    className="pt-minimal"
                    onClick={() => props.deleteContact(contactInfo)}
                  />
                  <MenuItem
                    icon="cross"
                    text="Cancel"
                    intent={Intent.PRIMARY}
                    className="pt-minimal pt-popover-dismiss"
                  />
                </Menu>

              }
              target={
                <Button
                  icon="trash"
                  text="Delete"
                  intent={Intent.DANGER}
                  minimal={true}
                />
              }
            />
          </div>
        </li>
      ))
        : <li className={`f5 items-center lh-copy list pa3 ph0-l tc`}>No contacts</li>}
    </ul>
  )
}

const mapStateToProps = (state: any) => {
  return {
    contacts: state.contactReducer.contacts
  };
}

export const ContactList = connect(mapStateToProps, { deleteContact })(ContactListComponent);
