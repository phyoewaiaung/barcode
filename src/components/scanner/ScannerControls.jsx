import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Flashlight, 
  FlashlightOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Settings,
  History,
  Play,
  Pause
} from 'lucide-react';
import { 
  toggleFlashlight, 
  toggleSound, 
  toggleCamera, 
  setScanning 
} from '../../store/scannerSlice';
import { toggleHistory, toggleSettings } from '../../store/historySlice';
import Button from '../common/Button';
import { useCamera } from '../../hooks/useCamera';

const ScannerControls = () => {
  const dispatch = useDispatch();
  const { 
    flashlight, 
    sound, 
    isScanning, 
    cameraEnabled 
  } = useSelector(state => state.scanner);
  
  const { 
    showHistory, 
    showSettings 
  } = useSelector(state => state.history);
  
  const { restartCamera } = useCamera();

  const handleFlashlightToggle = () => {
    dispatch(toggleFlashlight());
  };

  const handleSoundToggle = () => {
    dispatch(toggleSound());
  };

  const handleCameraRestart = () => {
    restartCamera();
    dispatch(toggleCamera());
  };

  const handleScanToggle = () => {
    dispatch(setScanning(!isScanning));
  };

  const handleHistoryToggle = () => {
    dispatch(toggleHistory());
  };

  const handleSettingsToggle = () => {
    dispatch(toggleSettings());
  };

  return (
    <div className="scanner-controls">
      <div className="controls-grid">
        {/* Flashlight Toggle */}
        <Button
          variant={flashlight ? 'primary' : 'secondary'}
          onClick={handleFlashlightToggle}
          className="control-button"
          aria-label={flashlight ? 'Turn off flashlight' : 'Turn on flashlight'}
        >
          {flashlight ? <Flashlight size={24} /> : <FlashlightOff size={24} />}
        </Button>

        {/* Sound Toggle */}
        <Button
          variant={sound ? 'primary' : 'secondary'}
          onClick={handleSoundToggle}
          className="control-button"
          aria-label={sound ? 'Turn off sound' : 'Turn on sound'}
        >
          {sound ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </Button>

        {/* Camera Restart */}
        <Button
          variant="secondary"
          onClick={handleCameraRestart}
          className="control-button"
          aria-label="Restart camera"
        >
          <RotateCcw size={24} />
        </Button>

        {/* Scan Toggle */}
        <Button
          variant={isScanning ? 'danger' : 'success'}
          onClick={handleScanToggle}
          className="control-button scan-toggle"
          aria-label={isScanning ? 'Stop scanning' : 'Start scanning'}
        >
          {isScanning ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        {/* History Toggle */}
        <Button
          variant={showHistory ? 'primary' : 'secondary'}
          onClick={handleHistoryToggle}
          className="control-button"
          aria-label={showHistory ? 'Hide history' : 'Show history'}
        >
          <History size={24} />
        </Button>

        {/* Settings Toggle */}
        <Button
          variant={showSettings ? 'primary' : 'secondary'}
          onClick={handleSettingsToggle}
          className="control-button"
          aria-label={showSettings ? 'Hide settings' : 'Show settings'}
        >
          <Settings size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ScannerControls;