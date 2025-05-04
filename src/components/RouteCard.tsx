
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RouteCardProps {
  id: string;
  name: string;
  color: string;
  startLocation: string;
  endLocation: string;
  frequency: string;
  operatingHours: string;
  status: 'active' | 'limited' | 'inactive';
}

export default function RouteCard({
  id,
  name,
  color,
  startLocation,
  endLocation,
  frequency,
  operatingHours,
  status
}: RouteCardProps) {
  const statusMap = {
    active: { label: 'Active', class: 'bg-green-500' },
    limited: { label: 'Limited Service', class: 'bg-yellow-500' },
    inactive: { label: 'Not Operating', class: 'bg-red-500' }
  };
  
  const statusInfo = statusMap[status];
  
  return (
    <div className="bus-route bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="h-2" 
        style={{ backgroundColor: color || '#0047AB' }}
      ></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-xl">{name}</h3>
          <Badge className={`${statusInfo.class} ml-2`}>{statusInfo.label}</Badge>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{startLocation}</span>
          <ArrowRight className="h-3 w-3 mx-1 flex-shrink-0" />
          <span>{endLocation}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Every {frequency} | {operatingHours}</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <Link 
            to={`/routes/${id}`} 
            className="text-csn-blue hover:text-csn-darkblue font-medium flex items-center"
          >
            Route Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          
          <Link 
            to={`/schedules/${id}`}
            className="text-sm text-gray-500 hover:text-csn-blue"
          >
            View Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
