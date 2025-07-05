// ActionButton.jsx - Reusable action button component
import React, { useState } from 'react';

const ActionButton = ({ type, data, icon: Icon, color, className = '', onClick, ...props }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setIsProcessing(true);
      try {
        await onClick();
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    setIsProcessing(true);
    try {
      switch (type) {
        case 'url':
          const url = data.startsWith('http') ? data : `https://${data}`;
          window.open(url, '_blank', 'noopener,noreferrer');
          break;
        case 'email':
          const email = data.startsWith('mailto:') ? data : `mailto:${data}`;
          window.location.href = email;
          break;
        case 'phone':
          const phone = data.startsWith('tel:') ? data : `tel:${data}`;
          window.location.href = phone;
          break;
        case 'sms':
          const sms = data.startsWith('sms:') ? data : `sms:${data}`;
          window.location.href = sms;
          break;
        case 'location':
          if (data.startsWith('geo:')) {
            window.open(`https://maps.google.com/?q=${data.substring(4)}`, '_blank');
          } else {
            window.open(`https://maps.google.com/?q=${data}`, '_blank');
          }
          break;
        case 'copy':
        default:
          await navigator.clipboard.writeText(data);
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionText = () => {
    switch (type) {
      case 'url': return 'Open';
      case 'email': return 'Email';
      case 'phone': return 'Call';
      case 'sms': return 'SMS';
      case 'location': return 'Map';
      case 'wifi': return 'Connect';
      case 'contact': return 'Contact';
      case 'event': return 'Event';
      case 'product': return 'Product';
      case 'copy': return 'Copy';
      default: return 'Action';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={`
        inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all 
        transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        bg-${color}-600 hover:bg-${color}-700 text-white focus:ring-${color}-500
        ${className}
      `}
      {...props}
    >
      {isProcessing ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span>{getActionText()}</span>
    </button>
  );
};

export default ActionButton;