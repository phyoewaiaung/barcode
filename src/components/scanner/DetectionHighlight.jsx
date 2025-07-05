import React from 'react';
import { useSelector } from 'react-redux';

const DetectionHighlight = () => {
  const { highlightBox } = useSelector(state => state.scanner);

  if (!highlightBox) return null;

  return (
    <div
      className="absolute border-2 border-green-400 bg-green-400 bg-opacity-20 rounded animate-pulse-ring"
      style={{
        left: `${highlightBox.x}px`,
        top: `${highlightBox.y}px`,
        width: `${highlightBox.width}px`,
        height: `${highlightBox.height}px`,
      }}
    >
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
    </div>
  );
};

export default DetectionHighlight;