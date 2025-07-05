import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import Button from '../common/Button';

const FormatSelector = () => {
  const { formats } = useSelector(state => state.scanner);
  const [isExpanded, setIsExpanded] = useState(false);

  const allFormats = [
    { key: 'qr_code', name: 'QR Code', description: 'Quick Response codes' },
    { key: 'code_128', name: 'Code 128', description: 'High-density linear barcode' },
    { key: 'code_39', name: 'Code 39', description: 'Variable length barcode' },
    { key: 'ean_13', name: 'EAN-13', description: 'European Article Number' },
    { key: 'ean_8', name: 'EAN-8', description: 'Short EAN barcode' },
    { key: 'upc_a', name: 'UPC-A', description: 'Universal Product Code' },
    { key: 'upc_e', name: 'UPC-E', description: 'Compressed UPC' },
    { key: 'codabar', name: 'Codabar', description: 'Linear barcode' },
    { key: 'code_93', name: 'Code 93', description: 'Compact variable-length' },
    { key: 'pdf_417', name: 'PDF417', description: '2D stacked barcode' },
    { key: 'data_matrix', name: 'Data Matrix', description: '2D matrix barcode' },
    { key: 'aztec_code', name: 'Aztec', description: '2D matrix barcode' },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Supported Formats
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mb-3">
        {formats.length} of {allFormats.length} formats enabled
      </p>
      
      {isExpanded && (
        <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3 bg-white">
          {allFormats.map((format) => (
            <div key={format.key} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {format.name}
                  </span>
                  {formats.includes(format.key) && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{format.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormatSelector;