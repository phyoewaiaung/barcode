// HistoryPanel.jsx - History management component
import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Wifi,
  User,
  Calendar,
  Package,
  AlertCircle
} from 'lucide-react';

const HistoryPanel = ({ isOpen, onClose, codes = [], onDelete, onClear, onCodeSelect }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCodes = codes.filter(code => {
    const matchesFilter = filter === 'all' || code.type === filter;
    const matchesSearch = code.data.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeColor = (type) => {
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

  const getTypeIcon = (type) => {
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
    const Icon = icons[type] || Copy;
    return <Icon className="w-4 h-4" />;
  };

  const uniqueTypes = [...new Set(codes.map(code => code.type))];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <div>
            <h3 className="font-bold text-xl text-gray-900">Scan History</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredCodes.length} of {codes.length} codes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClear}
              className="text-red-600 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-colors"
              title="Clear all history"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === type 
                    ? `bg-${getTypeColor(type)}-600 text-white` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Code List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredCodes.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 w-16 h-16 text-gray-300" />
              <p className="text-gray-500 text-lg">
                {codes.length === 0 ? 'No scanned codes yet' : 'No codes match your search'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {codes.length === 0 
                  ? 'Start scanning to see your history here' 
                  : 'Try adjusting your filters or search term'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCodes.map((code) => (
                <div
                  key={code.id}
                  className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                  onClick={() => onCodeSelect(code)}
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg bg-${getTypeColor(code.type)}-100 text-${getTypeColor(code.type)}-600`}>
                      {getTypeIcon(code.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-gray-900 truncate">
                        {code.data}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${getTypeColor(code.type)}-100 text-${getTypeColor(code.type)}-800`}>
                          {code.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {code.format}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(code.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(code.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;