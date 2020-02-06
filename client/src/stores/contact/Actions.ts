import axios from 'axios';
import { GET_ALL_CONTACTS, ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from './Types';
import { isEqual } from 'lodash';
import { IContact } from './Reducer';

const APIUrl = "http://localhost:4000/api/v1";

export const getAllContacts = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${APIUrl}/phonebook`)
    dispatch({ type: GET_ALL_CONTACTS, payload: response.data });
  } catch (error) {
    if (isEqual(error.message, 'Network Error')) {
      console.log('Network Error');
    } else {
      console.log(error.response);
    }
  }
};

export const createContact = (newContact: IContact) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${APIUrl}/phonebook`, newContact);
    dispatch({ type: ADD_CONTACT, payload: response.data });
    return response;
  } catch (error) {
    if (isEqual(error.message, 'Network Error')) {
      console.log('Network Error');
    } else {
      console.log(error.response);
      return error.response;
    }
  }
};

export const updateContact = (updatedContact: IContact) => async (dispatch: any) => {
  try {
    const response = await axios.put(`${APIUrl}/phonebook/${updatedContact._id}`, updatedContact);
    dispatch({ type: EDIT_CONTACT, payload: response.data });
    return response;
  } catch (error) {
    if (isEqual(error.message, 'Network Error')) {
      console.log('Network Error');
    } else {
      console.log(error.response);
      return error.response;
    }
  }
};

export const deleteContact = (updatedContact: IContact) => async (dispatch: any) => {
  try {
    const response = await axios.delete(`${APIUrl}/phonebook/${updatedContact._id}`);
    dispatch({ type: DELETE_CONTACT, payload: response.data.deletedContact });
  } catch (error) {
    if (isEqual(error.message, 'Network Error')) {
      console.log('Network Error');
    } else {
      console.log(error.response);
    }
  }
};

export const searchContacts = (searchingValue: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${APIUrl}/phonebook/search?phone=${searchingValue}`);
    dispatch({ type: GET_ALL_CONTACTS, payload: response.data });
  } catch (error) {
    if (isEqual(error.message, 'Network Error')) {
      console.log('Network Error');
    } else {
      console.log(error.response);
    }
  }
};