
import { useState } from 'react';
import { X, Bell, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlertBannerProps {
  message: string;
  type: 'info' | 'warning' | 'critical';
  url?: string;
}

export default function AlertBanner({ 
  message, 
  type = 'info',
  url = '/alerts'
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const bgColorMap = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    critical: 'bg-red-50 text-red-800 border-red-200'
  };
  
  const iconMap = {
    info: <Bell className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    critical: <AlertCircle className="h-5 w-5" />
  };
  
  return (
    <div className={`border-t border-b ${bgColorMap[type]} px-4 py-3`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {iconMap[type]}
          <p className="text-sm font-medium">{message}</p>
          {url && (
            <Link to={url} className="text-sm underline font-medium hover:opacity-80">
              Learn more
            </Link>
          )}
        </div>
        
        <button 
          onClick={() => setIsVisible(false)} 
          className="flex-shrink-0 ml-2"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
