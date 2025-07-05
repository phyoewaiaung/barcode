import React from 'react';

const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Dark overlay with transparent center */}
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white border-opacity-0 rounded-lg">
          {/* Transparent scanning area */}
          <div className="w-full h-full bg-transparent"></div>
        </div>
      </div>
      
      {/* Scanning frame */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white border-opacity-40 rounded-lg">
        {/* Corner indicators */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
        
        {/* Scanning line */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan-line"></div>
        </div>
      </div>
      
      {/* Instruction text */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg font-medium mb-2">Align barcode or QR code</p>
        <p className="text-sm text-gray-300">within the scanning area</p>
      </div>
    </div>
  );
};

export default ScannerOverlay;