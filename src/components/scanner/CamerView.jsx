import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCamera } from '../../hooks/useCamera';
import { useBarcodeDetector } from '../../hooks/useBarcodeDetector';
import ScannerOverlay from './ScannerOverlay';
import DetectionHighlight from './DetectionHighlight';

const CameraView = () => {
  const videoRef = useRef(null);
  const { isScanning, camera } = useSelector(state => state.scanner);
  const { startCamera, stopCamera, isInitialized } = useCamera();
  const { startScanning, stopScanning } = useBarcodeDetector();

  useEffect(() => {
    const initCamera = async () => {
      const stream = await startCamera(camera);
      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    initCamera();

    return () => {
      stopCamera();
    };
  }, [camera, startCamera, stopCamera]);

  useEffect(() => {
    if (isScanning && isInitialized && videoRef.current) {
      startScanning(videoRef.current);
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isScanning, isInitialized, startScanning, stopScanning]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <ScannerOverlay />
      <DetectionHighlight />
    </div>
  );
};

export default CameraView;