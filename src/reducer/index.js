import { combineReducers } from 'redux';

import getItemsReducer from './reducer';

const rootReducer = combineReducers({
  appState: getItemsReducer,
});

console.log('rootReducer', rootReducer.appState);
export default rootReducer;
