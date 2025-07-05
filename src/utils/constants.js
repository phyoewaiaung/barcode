export const SCANNER_CONFIG = {
  VIDEO_CONSTRAINTS: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  SCAN_INTERVAL: 100,
  MIN_SCAN_DELAY: 500,
  MAX_SCAN_DELAY: 5000,
  HISTORY_LIMIT: 50,
};

export const SUPPORTED_FORMATS = [
  'qr_code',
  'code_128',
  'code_39',
  'ean_13',
  'ean_8',
  'upc_a',
  'upc_e',
  'codabar',
  'code_93',
  'pdf_417',
  'data_matrix',
  'aztec_code',
];

export const ERROR_MESSAGES = {
  CAMERA_DENIED: 'Camera access denied. Please enable camera permissions.',
  SCANNER_INIT_FAILED: 'Failed to initialize barcode scanner.',
  BARCODE_DETECTOR_UNAVAILABLE: 'BarcodeDetector not supported in this browser.',
  GENERIC_ERROR: 'An unexpected error occurred.',
};