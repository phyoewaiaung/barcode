import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCode, setHighlightBox, setError } from '../store/scannerSlice';
import { addScannedCode } from '../store/historySlice';
import { detectCodeType } from '../utils/codeTypes';
import { playSuccessSound } from '../utils/audioUtils';
import { ERROR_MESSAGES, SCANNER_CONFIG } from '../utils/constants';

export const useBarcodeDetector = () => {
  const dispatch = useDispatch();
  const { isScanning, scanDelay, playSound, formats } = useSelector(state => state.scanner);
  const [detector, setDetector] = useState(null);
  const lastScanRef = useRef(0);
  const scanIntervalRef = useRef(null);

  // Initialize BarcodeDetector
  useEffect(() => {
    const initDetector = async () => {
      try {
        if ('BarcodeDetector' in window) {
          const supportedFormats = await BarcodeDetector.getSupportedFormats();
          const detector = new BarcodeDetector({ 
            formats: formats.filter(format => supportedFormats.includes(format))
          });
          setDetector(detector);
        } else {
          dispatch(setError(ERROR_MESSAGES.BARCODE_DETECTOR_UNAVAILABLE));
        }
      } catch (error) {
        console.error('BarcodeDetector initialization failed:', error);
        dispatch(setError(ERROR_MESSAGES.SCANNER_INIT_FAILED));
      }
    };

    initDetector();
  }, [dispatch, formats]);

  const scanForCodes = useCallback(async (videoElement) => {
    if (!detector || !videoElement || !isScanning) return;

    try {
      const codes = await detector.detect(videoElement);
      
      if (codes.length > 0) {
        const now = Date.now();
        if (now - lastScanRef.current > scanDelay) {
          const code = codes[0];
          const codeType = detectCodeType(code.rawValue);
          
          // Play sound if enabled
          if (playSound) {
            playSuccessSound();
          }

          // Update current code
          dispatch(setCurrentCode({
            data: code.rawValue,
            format: code.format,
            type: codeType,
          }));

          // Add to history
          dispatch(addScannedCode({
            data: code.rawValue,
            format: code.format,
            type: codeType,
          }));

          // Set highlight box
          if (code.boundingBox) {
            dispatch(setHighlightBox({
              x: code.boundingBox.x,
              y: code.boundingBox.y,
              width: code.boundingBox.width,
              height: code.boundingBox.height,
            }));
          }

          lastScanRef.current = now;
        }
      }
    } catch (error) {
      console.error('Barcode detection failed:', error);
    }
  }, [detector, isScanning, scanDelay, playSound, dispatch]);

  const startScanning = useCallback((videoElement) => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    scanIntervalRef.current = setInterval(() => {
      scanForCodes(videoElement);
    }, SCANNER_CONFIG.SCAN_INTERVAL);
  }, [scanForCodes]);

  const stopScanning = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    detector,
    startScanning,
    stopScanning,
    scanForCodes,
  };
};