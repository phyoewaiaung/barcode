export const detectCodeType = (data) => {
  // URL patterns
  if (data.match(/^https?:\/\//)) return 'url';
  if (data.match(/^www\./)) return 'url';
  
  // Communication patterns
  if (data.startsWith('mailto:')) return 'email';
  if (data.startsWith('tel:')) return 'phone';
  if (data.startsWith('sms:')) return 'sms';
  
  // Location patterns
  if (data.startsWith('geo:')) return 'location';
  if (data.match(/^-?\d+\.?\d*,-?\d+\.?\d*$/)) return 'location';
  
  // Network patterns
  if (data.startsWith('WIFI:')) return 'wifi';
  
  // Contact patterns
  if (data.startsWith('BEGIN:VCARD')) return 'contact';
  if (data.startsWith('MECARD:')) return 'contact';
  
  // Calendar patterns
  if (data.startsWith('BEGIN:VEVENT')) return 'event';
  
  // Product patterns
  if (data.match(/^\d{8,14}$/)) return 'product';
  
  // Default
  return 'text';
};

export const getActionConfig = (type) => {
  const configs = {
    url: { icon: 'ExternalLink', text: 'Open', color: 'blue' },
    email: { icon: 'Mail', text: 'Email', color: 'green' },
    phone: { icon: 'Phone', text: 'Call', color: 'green' },
    sms: { icon: 'MessageCircle', text: 'SMS', color: 'blue' },
    location: { icon: 'MapPin', text: 'Map', color: 'red' },
    wifi: { icon: 'Wifi', text: 'Connect', color: 'purple' },
    contact: { icon: 'User', text: 'Contact', color: 'indigo' },
    event: { icon: 'Calendar', text: 'Event', color: 'orange' },
    product: { icon: 'Package', text: 'Product', color: 'yellow' },
    text: { icon: 'Copy', text: 'Copy', color: 'gray' },
  };
  
  return configs[type] || configs.text;
};