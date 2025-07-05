import React from 'react';
import { Info, ExternalLink, Github, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5" />
        About
      </h3>
      
      <div className="space-y-4">
        {/* App Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Advanced Barcode Scanner
          </h4>
          <p className="text-sm text-gray-600">
            A modern, web-based barcode and QR code scanner built with React. 
            Supports multiple formats and provides real-time scanning capabilities.
          </p>
        </div>

        {/* Version Info */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Version
            </label>
            <p className="text-sm text-gray-500">
              v1.0.0
            </p>
          </div>
        </div>

        {/* Browser Support */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Browser Support
          </label>
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>BarcodeDetector API:</span>
              <span className={`font-medium ${
                'BarcodeDetector' in window ? 'text-green-600' : 'text-red-600'
              }`}>
                {'BarcodeDetector' in window ? 'Supported' : 'Not Supported'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Camera Access:</span>
              <span className={`font-medium ${
                navigator.mediaDevices ? 'text-green-600' : 'text-red-600'
              }`}>
                {navigator.mediaDevices ? 'Supported' : 'Not Supported'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> using React & Web APIs
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;