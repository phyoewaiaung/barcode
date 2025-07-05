import React, { useState } from 'react';
import { Camera, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const PermissionRequest = ({ onPermissionGranted, onPermissionDenied }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'

  const requestCameraPermission = async () => {
    setIsRequesting(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Permission granted
      setPermissionState('granted');
      stream.getTracks().forEach(track => track.stop()); // Stop the stream
      onPermissionGranted();
    } catch (error) {
      console.error('Camera permission denied:', error);
      setPermissionState('denied');
      onPermissionDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  const getPermissionIcon = () => {
    switch (permissionState) {
      case 'granted':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'denied':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Camera className="w-16 h-16 text-blue-500" />;
    }
  };

  const getPermissionMessage = () => {
    switch (permissionState) {
      case 'granted':
        return {
          title: 'Camera Access Granted',
          message: 'You can now scan barcodes and QR codes!'
        };
      case 'denied':
        return {
          title: 'Camera Access Denied',
          message: 'Please enable camera permissions in your browser settings to use the scanner.'
        };
      default:
        return {
          title: 'Camera Permission Required',
          message: 'This app needs access to your camera to scan barcodes and QR codes.'
        };
    }
  };

  const { title, message } = getPermissionMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            {getPermissionIcon()}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Privacy Notice */}
          {permissionState === 'prompt' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Privacy Notice
                  </h4>
                  <p className="text-sm text-blue-700">
                    Your camera data is processed locally and never sent to external servers. 
                    We only access your camera to scan codes when you're actively using the app.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {permissionState === 'prompt' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => window.close()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={requestCameraPermission}
                  disabled={isRequesting}
                  className="flex-1"
                >
                  {isRequesting ? 'Requesting...' : 'Allow Camera'}
                </Button>
              </>
            )}
            
            {permissionState === 'denied' && (
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Retry
              </Button>
            )}
            
            {permissionState === 'granted' && (
              <Button
                onClick={onPermissionGranted}
                className="flex-1"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;