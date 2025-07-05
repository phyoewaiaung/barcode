import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scannedCodes: [],
  showHistory: false,
  showSettings: false,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addScannedCode: (state, action) => {
      const newCode = {
        id: Date.now(),
        data: action.payload.data,
        format: action.payload.format,
        timestamp: new Date().toISOString(),
        type: action.payload.type,
      };
      state.scannedCodes = [newCode, ...state.scannedCodes.slice(0, 49)];
    },
    deleteCode: (state, action) => {
      state.scannedCodes = state.scannedCodes.filter(
        code => code.id !== action.payload
      );
    },
    clearHistory: (state) => {
      state.scannedCodes = [];
    },
    toggleHistory: (state) => {
      state.showHistory = !state.showHistory;
    },
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
  },
});

export const {
  addScannedCode,
  deleteCode,
  clearHistory,
  toggleHistory,
  toggleSettings,
} = historySlice.actions;

export default historySlice.reducer;