import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

const STATE_DATA = 'state-v2';

function saveToStorage(store) {
  return next => (action) => {
    next(action);
    const state = store.getState();
    localStorage.setItem(STATE_DATA, JSON.stringify(state));
  };
}

let oldState = localStorage.getItem(STATE_DATA);

if (oldState != null) {
  try {
    oldState = JSON.parse(oldState);
  } catch (e) {
    console.log('Error parsing saved state', e);
  }
}

const reducer = combineReducers(reducers);
const middleWare = applyMiddleware(thunk, logger, saveToStorage);

let theStore;

if (oldState) {
  theStore = createStore(
    reducer,
    oldState,
    middleWare,
  );
} else {
  theStore = createStore(
    reducer,
    middleWare,
  );
}

const store = theStore;
export default store;
