import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound } from '../../store/scannerSlice';
import Button from '../common/Button';

const AudioSettings = () => {
  const dispatch = useDispatch();
  const { playSound } = useSelector(state => state.scanner);

  const handleToggleSound = () => {
    dispatch(toggleSound());
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {playSound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        Audio Settings
      </h3>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Scan Sound
          </label>
          <p className="text-sm text-gray-500">
            Play sound when barcode is detected
          </p>
        </div>
        <Button
          variant={playSound ? "primary" : "outline"}
          size="sm"
          onClick={handleToggleSound}
          className="flex items-center gap-2"
        >
          {playSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {playSound ? 'On' : 'Off'}
        </Button>
      </div>
    </div>
  );
};

export default AudioSettings;