import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Archive } from 'lucide-react';
import { clearHistory } from '../../store/historySlice';
import Button from '../common/Button';

const HistorySettings = () => {
  const dispatch = useDispatch();
  const { scannedCodes } = useSelector(state => state.history);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history? This action cannot be undone.')) {
      dispatch(clearHistory());
    }
  };

  const exportHistory = () => {
    if (scannedCodes.length === 0) {
      alert('No scan history to export');
      return;
    }

    const dataStr = JSON.stringify(scannedCodes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `barcode-history-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Archive className="w-5 h-5" />
        History Settings
      </h3>
      
      <div className="space-y-4">
        {/* History Info */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Scan History
            </label>
            <p className="text-sm text-gray-500">
              {scannedCodes.length} items stored (max 50)
            </p>
          </div>
        </div>

        {/* Export History */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Export History
            </label>
            <p className="text-sm text-gray-500">
              Download scan history as JSON
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={exportHistory}
            disabled={scannedCodes.length === 0}
            className="flex items-center gap-2"
          >
            <Archive className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Clear History */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Clear History
            </label>
            <p className="text-sm text-gray-500">
              Delete all stored scan results
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearHistory}
            disabled={scannedCodes.length === 0}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistorySettings;