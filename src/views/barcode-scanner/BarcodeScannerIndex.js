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
            
            dispatch({
              type: 'set',
              barcodeFormat:result.codeResult.format, 
              lastBarcodeData: result.codeResult.code, 
              playSound: true,
            })

            // remove sound after 800ms
            setTimeout(()=> {
                dispatch({type: 'set', playSound: false})
            },800)

          });
         
          return () => {
            Quagga.stop();
          };
    }
  }, [dispatch, cameraAccess]);

  const hightlight = (box) => {
    const videoRect = videoRef.current.getBoundingClientRect();

    const minX = Math.min(box[0][0], box[1][0], box[2][0], box[3][0]);
    const minY = Math.min(box[0][1], box[1][1], box[2][1], box[3][1]);
    const maxX = Math.max(box[0][0], box[1][0], box[2][0], box[3][0]);
    const maxY = Math.max(box[0][1], box[1][1], box[2][1], box[3][1]);

    const rectWidth = maxX - minX;
    const rectHeight = maxY - minY;

    const scaleX = videoRect.width / videoRef.current.videoWidth;
    const scaleY = videoRect.height / videoRef.current.videoHeight;

    const adjustedMinX = Math.max(minX - rectWidth * 0.1, 0); // Adjusting minX by 10% of the barcode width
    const adjustedMinY = Math.max(minY - rectHeight * 0.1, 0); // Adjusting minY by 10% of the barcode height
    const adjustedWidth = rectWidth * 1.2; // Increasing the width by 20%
    const adjustedHeight = rectHeight * 1.2; // Increasing the height by 20%

    setHighlightStyle({
      top: `${adjustedMinY * scaleY}px`,
      left: `${adjustedMinX * scaleX}px`,
      width: `${adjustedWidth * scaleX}px`,
      height: `${adjustedHeight * scaleY}px`,
    });
  }

  return (
        <>
          <video ref={videoRef} autoPlay playsInline className="video" />
          <div id='highlight'
          style={{
              position: 'absolute',
              backgroundColor:'#dcdcdc',
              opacity: '0.8',
              border:'2px solid rgb(251, 248, 247)',
              ...highlightStyle,
            }}
          ></div>
        </>
  );
};

export default BarcodeScannerIndex;
