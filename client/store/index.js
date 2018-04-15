import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import playersReducer from './players';

const reducer = combineReducers({
  players: playersReducer
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;

export * from './players';

