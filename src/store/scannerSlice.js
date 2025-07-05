import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cameraAccess: null,
  isScanning: false,
  currentCode: null,
  playSound: true,
  flashlight: false,
  camera: 'environment',
  scanDelay: 2000,
  highlightBox: null,
  isLoading: false,
  error: null,
  formats: [
    'qr_code', 'code_128', 'code_39', 'ean_13', 'ean_8', 
    'upc_a', 'upc_e', 'codabar', 'code_93', 'pdf_417', 
    'data_matrix', 'aztec_code'
  ]
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    setCameraAccess: (state, action) => {
      state.cameraAccess = action.payload;
    },
    setScanning: (state, action) => {
      state.isScanning = action.payload;
    },
    setCurrentCode: (state, action) => {
      state.currentCode = action.payload;
    },
    clearCurrentCode: (state) => {
      state.currentCode = null;
      state.highlightBox = null;
    },
    toggleSound: (state) => {
      state.playSound = !state.playSound;
    },
    toggleFlashlight: (state) => {
      state.flashlight = !state.flashlight;
    },
    toggleCamera: (state) => {
      state.camera = state.camera === 'environment' ? 'user' : 'environment';
    },
    setScanDelay: (state, action) => {
      state.scanDelay = action.payload;
    },
    setHighlightBox: (state, action) => {
      state.highlightBox = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCameraAccess,
  setScanning,
  setCurrentCode,
  clearCurrentCode,
  toggleSound,
  toggleFlashlight,
  toggleCamera,
  setScanDelay,
  setHighlightBox,
  setLoading,
  setError,
} = scannerSlice.actions;

export default scannerSlice.reducer;