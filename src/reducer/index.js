import { combineReducers } from 'redux';

import { getItemsReducer } from './reducer';

export default combineReducers({
  appState: getItemsReducer,
});
