import BarcodeScannerIndex from "./views/barcode-scanner/BarcodeScannerIndex"
import BarcodeDetail from "./views/barcode-scanner/BarcodeDetail"
import { useDispatch, useSelector } from "react-redux"
import NoCameraPermissionIndex from "./views/no-camera-permission/NoCameraPermissionIndex";
const App = () => {
  const lastBarcodeData = useSelector(state => state.lastBarcodeData);
  const playSound = useSelector(state => state.playSound);
  const cameraAccess = useSelector(state => state.cameraAccess);
  const dispatch = useDispatch();

  const clearClick = () =>(
    dispatch({type: 'set',barcodeFormat:"", lastBarcodeData:"", playSound:false})
  )
  
  return(
    <>
      {cameraAccess === true &&
        <>
          <BarcodeScannerIndex />
          {lastBarcodeData !== "" &&
            <BarcodeDetail clearClick={clearClick}/>
          }
          {playSound === true &&
            <audio src='/audio/scanner-sound.mp3' autoPlay />
          }
        </>
      }
      {cameraAccess === false &&
        <NoCameraPermissionIndex />
      }
    </>
  )
}

export default App