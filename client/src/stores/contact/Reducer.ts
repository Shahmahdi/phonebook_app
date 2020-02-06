import { GET_ALL_CONTACTS, ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "./Types";
import { isEqual } from "lodash";

export interface IContact {
  _id?: string;
  name: string;
  phoneNumber: string;
}

const InitialState = {
  contacts: [{
    _id: '',
    name: '',
    phoneNumber: ''
  }]
}

export const ContactReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts,
          action.payload
        ]
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => (
          isEqual(contact._id, action.payload._id) ? action.payload : contact
        ))
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => (
          isEqual(contact._id, action.payload._id) === false
        ))
      };
    default:
      return state;
  }
}