import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  X, 
  Camera, 
  Volume2, 
  VolumeX, 
  Zap, 
  ZapOff, 
  Settings, 
  Clock,
  RotateCcw,
  Trash2,
  Info
} from 'lucide-react';
import { 
  toggleSound, 
  toggleFlashlight, 
  toggleCamera, 
  setScanDelay 
} from '../../store/scannerSlice';
import { 
  clearHistory, 
  toggleSettings 
} from '../../store/historySlice';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FormatSelector from './FormatSelector';
import ScanDelaySlider from './ScanDelaySlider';
import CameraSettings from './CameraSettings';
import AudioSettings from './AudioSettings';
import HistorySettings from './HistorySettings';
import AboutSection from './AboutSection';

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const { showSettings } = useSelector(state => state.history);
  const { 
    playSound, 
    flashlight, 
    camera, 
    scanDelay, 
    formats 
  } = useSelector(state => state.scanner);
  const { scannedCodes } = useSelector(state => state.history);

  const handleClose = () => {
    dispatch(toggleSettings());
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history?')) {
      dispatch(clearHistory());
    }
  };

  if (!showSettings) return null;

  return (
    <Modal onClose={handleClose} className="max-w-2xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Camera Settings */}
          <CameraSettings />

          {/* Audio Settings */}
          <AudioSettings />

          {/* Scan Settings */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Scan Settings
            </h3>
            
            <div className="space-y-4">
              <ScanDelaySlider />
              <FormatSelector />
            </div>
          </div>

          {/* History Settings */}
          <HistorySettings />

          {/* About */}
          <AboutSection />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsPanel;