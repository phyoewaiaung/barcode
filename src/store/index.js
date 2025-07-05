import { configureStore } from '@reduxjs/toolkit';
import scannerReducer from './scannerSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    scanner: scannerReducer,
    history: historyReducer,
  },
});

export default store;