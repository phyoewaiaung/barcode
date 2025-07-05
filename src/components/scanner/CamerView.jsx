import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCamera } from '../../hooks/useCamera';
import { useBarcodeDetector } from '../../hooks/useBarcodeDetector';
import ScannerOverlay from './ScannerOverlay';
import DetectionHighlight from './DetectionHighlight';
import { Loader2 } from 'lucide-react';

const CameraView = () => {
  const videoRef = useRef(null);
  const { isScanning, camera } = useSelector(state => state.scanner);
  const { startCamera, stopCamera, isInitialized } = useCamera();
  const { startScanning, stopScanning } = useBarcodeDetector();

  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      setLoading(true);
      try {
        const stream = await startCamera(camera);
        if (stream && videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      } catch (err) {
        console.error('Camera error:', err);
        setCameraError('Unable to access the camera. Please allow permissions or try another device.');
      } finally {
        setLoading(false);
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

    return () => stopScanning();
  }, [isScanning, isInitialized, startScanning, stopScanning]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black shadow-lg">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[50%] h-[50%] object-cover"
      />

      {/* Overlay Elements */}
      {isScanning && (
        <>
          <ScannerOverlay />
          <DetectionHighlight />
        </>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <Loader2 className="animate-spin w-8 h-8 text-white" />
          <span className="ml-2 text-white text-sm">Initializing camera...</span>
        </div>
      )}

      {/* Camera Error */}
      {cameraError && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-600 text-white text-sm p-3 rounded-lg shadow z-30">
          {cameraError}
        </div>
      )}

      {/* Instruction (Optional) */}
      {!loading && !cameraError && !isScanning && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/60 px-4 py-2 rounded-full z-10">
          Tap the scan button below to start scanning
        </div>
      )}
    </div>
  );
};

export default CameraView;
