import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger),
);

export default store;
