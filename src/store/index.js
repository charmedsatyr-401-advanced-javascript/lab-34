import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reporter from '../middleware/reporter.js';

import recordsReducer from '../reducers/records-reducer.js';
import schemaReducer from '../reducers/schema-reducer.js';

const reducers = combineReducers({
  records: recordsReducer,
  schema: schemaReducer,
});

const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk, reporter)));
export default store;
