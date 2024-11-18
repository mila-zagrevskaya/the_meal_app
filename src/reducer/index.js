import { combineReducers } from 'redux';

import getItemsReducer from './reducer';

const rootReducer = combineReducers({
  appState: getItemsReducer,
});

export default rootReducer;
