import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Zap, ZapOff, RotateCcw } from 'lucide-react';
import { toggleFlashlight, toggleCamera } from '../../store/scannerSlice';
import Button from '../common/Button';

const CameraSettings = () => {
  const dispatch = useDispatch();
  const { flashlight, camera } = useSelector(state => state.scanner);

  const handleToggleFlashlight = () => {
    dispatch(toggleFlashlight());
  };

  const handleToggleCamera = () => {
    dispatch(toggleCamera());
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        Camera Settings
      </h3>
      
      <div className="space-y-4">
        {/* Camera Selection */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Camera
            </label>
            <p className="text-sm text-gray-500">
              {camera === 'environment' ? 'Back Camera' : 'Front Camera'}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleCamera}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Switch
          </Button>
        </div>

        {/* Flashlight Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Flashlight
            </label>
            <p className="text-sm text-gray-500">
              Turn on camera flash for better scanning
            </p>
          </div>
          <Button
            variant={flashlight ? "primary" : "outline"}
            size="sm"
            onClick={handleToggleFlashlight}
            className="flex items-center gap-2"
          >
            {flashlight ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
            {flashlight ? 'On' : 'Off'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraSettings;