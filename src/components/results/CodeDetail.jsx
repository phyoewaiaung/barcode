import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Share, 
  Star, 
  StarOff,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Wifi,
  User,
  Calendar,
  Package,
  QrCode,
  Barcode,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CodeDetail = ({ code, onClose, onFavorite, isFavorite = false }) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const getIcon = (type) => {
    const icons = {
      url: ExternalLink,
      email: Mail,
      phone: Phone,
      sms: MessageCircle,
      location: MapPin,
      wifi: Wifi,
      contact: User,
      event: Calendar,
      product: Package,
      text: Copy,
    };
    return icons[type] || Copy;
  };

  const getColor = (type) => {
    const colors = {
      url: 'blue',
      email: 'green',
      phone: 'green',
      sms: 'blue',
      location: 'red',
      wifi: 'purple',
      contact: 'indigo',
      event: 'orange',
      product: 'yellow',
      text: 'gray',
    };
    return colors[type] || 'gray';
  };

  const getFormatIcon = (format) => {
    if (format.toLowerCase().includes('qr')) {
      return QrCode;
    }
    return Barcode;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Scanned Code',
          text: code.data,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        // Fallback to copy
        await handleCopy();
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const handleAction = () => {
    switch (code.type) {
      case 'url':
        const url = code.data.startsWith('http') ? code.data : `https://${code.data}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        break;
      case 'email':
        const email = code.data.startsWith('mailto:') ? code.data : `mailto:${code.data}`;
        window.location.href = email;
        break;
      case 'phone':
        const phone = code.data.startsWith('tel:') ? code.data : `tel:${code.data}`;
        window.location.href = phone;
        break;
      case 'sms':
        const sms = code.data.startsWith('sms:') ? code.data : `sms:${code.data}`;
        window.location.href = sms;
        break;
      case 'location':
        if (code.data.startsWith('geo:')) {
          window.open(`https://maps.google.com/?q=${code.data.substring(4)}`, '_blank');
        } else {
          window.open(`https://maps.google.com/?q=${code.data}`, '_blank');
        }
        break;
      case 'wifi':
        // Show WiFi connection instructions
        alert('WiFi configuration detected. Please connect manually using the displayed information.');
        break;
      default:
        handleCopy();
        break;
    }
  };

  const Icon = getIcon(code.type);
  const color = getColor(code.type);
  const FormatIcon = getFormatIcon(code.format);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Code Detected</h3>
              <div className="flex items-center space-x-2 mt-1">
                <FormatIcon className="w-4 h-4 text-white/80" />
                <span className="text-sm text-white/80 uppercase font-medium">
                  {code.format}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Code Content */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">Content</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}>
                  {code.type}
                </span>
                <button
                  onClick={onFavorite}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isFavorite ? (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 relative">
              <div className="font-mono text-sm text-gray-800 break-all leading-relaxed">
                {code.data}
              </div>
              {copied && (
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>Copied!</span>
                </div>
              )}
            </div>
          </div>

          {/* Code Analysis */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Code Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Type:</span>
                <span className="text-blue-900 font-medium capitalize">{code.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Format:</span>
                <span className="text-blue-900 font-medium">{code.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Length:</span>
                <span className="text-blue-900 font-medium">{code.data.length} characters</span>
              </div>
              {code.timestamp && (
                <div className="flex justify-between">
                  <span className="text-blue-700">Scanned:</span>
                  <span className="text-blue-900 font-medium">
                    {new Date(code.timestamp).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleAction}
              className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-xl bg-${color}-600 hover:bg-${color}-700 text-white font-medium transition-all transform hover:scale-105 shadow-lg`}
            >
              <Icon className="w-5 h-5" />
              <span>
                {code.type === 'url' && 'Open Link'}
                {code.type === 'email' && 'Send Email'}
                {code.type === 'phone' && 'Call Number'}
                {code.type === 'sms' && 'Send SMS'}
                {code.type === 'location' && 'View Location'}
                {code.type === 'wifi' && 'View WiFi Info'}
                {code.type === 'contact' && 'Add Contact'}
                {code.type === 'event' && 'Add Event'}
                {code.type === 'product' && 'Search Product'}
                {code.type === 'text' && 'Copy Text'}
              </span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDetail;