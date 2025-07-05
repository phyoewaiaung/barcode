import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScanDelay } from '../../store/scannerSlice';

const ScanDelaySlider = () => {
  const dispatch = useDispatch();
  const { scanDelay } = useSelector(state => state.scanner);

  const handleDelayChange = (e) => {
    dispatch(setScanDelay(parseInt(e.target.value)));
  };

  const formatDelay = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${ms / 1000}s`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Scan Delay
        </label>
        <span className="text-sm text-gray-500 font-mono">
          {formatDelay(scanDelay)}
        </span>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min="500"
          max="5000"
          step="250"
          value={scanDelay}
          onChange={handleDelayChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>Fast (0.5s)</span>
          <span>Slow (5s)</span>
        </div>
        
        <p className="text-xs text-gray-500">
          Time between consecutive scans of the same code
        </p>
      </div>
    </div>
  );
};

export default ScanDelaySlider;