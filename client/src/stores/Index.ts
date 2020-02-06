import { combineReducers } from "redux";
import { ContactReducer } from "./contact/Reducer";

export const RootReducer = combineReducers({
  contactReducer: ContactReducer,
});