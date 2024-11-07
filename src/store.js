import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});
console.log('store store', store);

export default store;
