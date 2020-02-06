import { createStore, compose, applyMiddleware,  } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from './stores/Index';

const initialState = {} as any;

const middleware = [thunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
  )
);