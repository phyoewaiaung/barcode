import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Quagga from 'quagga';

const BarcodeScannerIndex = () => {
  const dispatch = useDispatch();
  const [cameraAccess, setCameraAccess] = useState(false); // check camera permission
  const [highlightStyle, setHighlightStyle] = useState({}); // for detected barcode style
  const videoRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video:  { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        setCameraAccess(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (cameraAccess) {
        Quagga.init({
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current,
            },
            locator: {
                patchSize: 'medium',
                halfSample: true,
            },
            decoder: {
              readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'],
            },
          }, (err) => {
            if (err) {
              console.error('Failed to initialize barcode scanner', err);
              return;
            }
            Quagga.start();
          });
      
          Quagga.onDetected((result) => {
            hightlight(result.box);
            dispatch({type: 'set',barcodeFormat:result.codeResult.format, lastBarcodeData: result.codeResult.code, playSound: true})
            setTimeout(()=> {
                dispatch({type: 'set', playSound:false})
            },800)
          });
         
          return () => {
            Quagga.stop();
          };
    }
  }, [dispatch, cameraAccess]);

  const hightlight = (box) => {
    const minX = Math.min(box[0][0], box[1][0], box[2][0], box[3][0]);
    const minY = Math.min(box[0][1], box[1][1], box[2][1], box[3][1]);
    const maxX = Math.max(box[0][0], box[1][0], box[2][0], box[3][0]);
    const maxY = Math.max(box[0][1], box[1][1], box[2][1], box[3][1]);

    const rectWidth = maxX - minX;
    const rectHeight = maxY - minY

    setHighlightStyle({
      top: `${minY}px`,
      left: `${minX}px`,
      width: `${rectWidth}px`,
      height: `${rectHeight}px`,
    });
  }

  return (
    <div className="barcode-scanner">
        <video ref={videoRef} autoPlay playsInline className="video" />
        <div id='highlight'
         style={{
          position: 'absolute',
          backgroundColor:'#fff',
          opacity:'0.7',
          border:'2px solid #fff',
          ...highlightStyle,
        }}
        ></div>
    </div>
  );
};

export default BarcodeScannerIndex;
