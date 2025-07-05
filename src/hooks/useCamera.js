import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCameraAccess, setError } from '../store/scannerSlice';
import { SCANNER_CONFIG, ERROR_MESSAGES } from '../utils/constants';

export const useCamera = () => {
  const dispatch = useDispatch();
  const streamRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const startCamera = useCallback(async (facingMode = 'environment') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          ...SCANNER_CONFIG.VIDEO_CONSTRAINTS,
        },
      });
      
      streamRef.current = stream;
      setIsInitialized(true);
      dispatch(setCameraAccess(true));
      dispatch(setError(null));
      
      return stream;
    } catch (error) {
      console.error('Camera access failed:', error);
      dispatch(setCameraAccess(false));
      dispatch(setError(ERROR_MESSAGES.CAMERA_DENIED));
      return null;
    }
  }, [dispatch]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsInitialized(false);
    }
  }, []);

  const toggleFlashlight = useCallback(async (enabled) => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: enabled }]
          });
          return true;
        } catch (error) {
          console.error('Flashlight toggle failed:', error);
          return false;
        }
      }
    }
    return false;
  }, []);

  return {
    startCamera,
    stopCamera,
    toggleFlashlight,
    isInitialized,
    stream: streamRef.current,
  };
};