
import { Link } from 'react-router-dom';
import { MapPin, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-csn-blue to-csn-darkblue text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Your Campus Connection
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Safe, reliable transportation for CSN students and faculty between all campuses. Track buses in real-time and never miss your ride.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-csn-orange hover:bg-opacity-90 text-white border-none">
                <Link to="/routes">View Routes</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-csn-blue">
                <Link to="/tracker">Live Bus Tracker</Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="space-y-4">
              <Link to="/routes" className="flex items-center p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all">
                <div className="bg-csn-orange p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Bus Routes</h3>
                  <p className="text-sm opacity-80">View all campus routes and stops</p>
                </div>
              </Link>
              
              <Link to="/schedules" className="flex items-center p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all">
                <div className="bg-csn-orange p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Schedules</h3>
                  <p className="text-sm opacity-80">Check bus times for all routes</p>
                </div>
              </Link>
              
              <Link to="/alerts" className="flex items-center p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all">
                <div className="bg-csn-orange p-2 rounded-full mr-4">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Service Alerts</h3>
                  <p className="text-sm opacity-80">View current service disruptions</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
