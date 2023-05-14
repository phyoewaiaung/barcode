import BarcodeScannerIndex from "./barcode-scanner/BarcodeScannerIndex"
import BarcodeDetail from "./barcode-scanner/BarcodeDetail"
import { useDispatch, useSelector } from "react-redux"
const App = () => {
  const lastBarcodeData = useSelector(state => state.lastBarcodeData);
  const playSound = useSelector(state => state.playSound);
  const dispatch = useDispatch();

  const clearClick = () =>(
    dispatch({type: 'set',barcodeFormat:"", lastBarcodeData:"", playSound:false})
  )
  return(
    <>
      <BarcodeScannerIndex />
      {lastBarcodeData !== "" &&
        <BarcodeDetail clearClick={clearClick}/>
      }
      {playSound === true &&
        <audio src='/audio/scanner-sound.mp3' controls autoPlay />
      }
    </>
  )
}

export default App