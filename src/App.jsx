import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History, Pause, Play, RotateCcw, Settings, Zap, ZapOff } from "lucide-react";
import {
  clearCurrentCode,
  setScanning,
  toggleCamera,
  toggleFlashlight,
} from "./store/scannerSlice";
import {
  toggleHistory,
  toggleSettings,
} from "./store/historySlice";
import CodeDetail from "./components/results/CodeDetail";
import CameraView from "./components/scanner/CamerView";
import HistoryPanel from "./components/results/HistoryPanel";
import SettingsPanel from "./components/settings/SettingsPanel";

const mockCodes = [
  { data: "https://example.com", format: "qr_code", type: "url" },
  { data: "Hello, World!", format: "qr_code", type: "text" },
  { data: "tel:+1234567890", format: "qr_code", type: "phone" },
  { data: "mailto:test@example.com", format: "qr_code", type: "email" },
];

const App = () => {
  const dispatch = useDispatch();

  const {
    isScanning,
    flashlight,
    camera,
    currentCode,
    error,
  } = useSelector((state) => state.scanner);

  const { showHistory, showSettings } = useSelector((state) => state.history);

  const [mockCode, setMockCode] = useState(null);

  const handleScanToggle = () => {
    if (!isScanning) {
      dispatch(setScanning(true));
      // Simulate scanning result
      setTimeout(() => {
        const randomCode =
          mockCodes[Math.floor(Math.random() * mockCodes.length)];
        setMockCode(randomCode);
        dispatch(setScanning(false));
      }, 3000);
    } else {
      dispatch(setScanning(false));
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Camera View */}
        <div className="w-[50vw] h-[50vh]">
          <CameraView />
        </div>

      {/* Error Display */}
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-600 text-white p-3 rounded-lg z-40">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(toggleFlashlight())}
            className={`p-3 rounded-full ${
              flashlight ? "bg-yellow-500" : "bg-black/50"
            } text-white`}
          >
            {flashlight ? (
              <Zap className="w-6 h-6" />
            ) : (
              <ZapOff className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => dispatch(toggleCamera())}
            className="p-3 rounded-full bg-black/50 text-white"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(toggleHistory())}
            className="p-3 rounded-full bg-black/50 text-white"
          >
            <History className="w-6 h-6" />
          </button>
          <button
            onClick={() => dispatch(toggleSettings())}
            className="p-3 rounded-full bg-black/50 text-white"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={handleScanToggle}
          className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isScanning
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-colors shadow-lg`}
        >
          {isScanning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
      </div>

      {/* Code Detail Modal */}
      {(currentCode || mockCode) && (
        <CodeDetail
          code={currentCode || mockCode}
          onClose={() => {
            dispatch(clearCurrentCode());
            setMockCode(null);
          }}
        />
      )}

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => dispatch(toggleHistory())}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => dispatch(toggleSettings())}
      />
    </div>
  );
};

export default App;
