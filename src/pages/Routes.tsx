
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteCard from '@/components/RouteCard';
import RouteMap from '@/components/RouteMap';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fix type issues with the routes by explicitly defining tuples
const routes = [
  {
    id: "1",
    name: "Blue Line",
    color: "#0047AB",
    startLocation: "Charleston Campus",
    endLocation: "Henderson Campus",
    frequency: "30 min",
    operatingHours: "6:00 AM - 10:00 PM",
    status: "active" as const,
    path: [[36.156, -115.178] as [number, number], [36.148, -115.157] as [number, number], [36.139, -115.129] as [number, number]],
    stops: [
      { name: "Charleston Campus", location: [36.156, -115.178] as [number, number] },
      { name: "Downtown Terminal", location: [36.148, -115.157] as [number, number] },
      { name: "Henderson Campus", location: [36.139, -115.129] as [number, number] }
    ]
  },
  {
    id: "2",
    name: "Green Line",
    color: "#008000",
    startLocation: "North Las Vegas Campus",
    endLocation: "Charleston Campus",
    frequency: "30 min",
    operatingHours: "6:00 AM - 9:00 PM",
    status: "active" as const,
    path: [[36.198, -115.175] as [number, number], [36.177, -115.172] as [number, number], [36.156, -115.178] as [number, number]],
    stops: [
      { name: "North Las Vegas Campus", location: [36.198, -115.175] as [number, number] },
      { name: "Civic Center", location: [36.177, -115.172] as [number, number] },
      { name: "Charleston Campus", location: [36.156, -115.178] as [number, number] }
    ]
  },
  {
    id: "3",
    name: "Orange Line",
    color: "#FF6B35",
    startLocation: "Henderson Campus",
    endLocation: "West Charleston",
    frequency: "45 min",
    operatingHours: "7:00 AM - 8:00 PM",
    status: "limited" as const,
    path: [[36.139, -115.129] as [number, number], [36.147, -115.189] as [number, number], [36.159, -115.205] as [number, number]],
    stops: [
      { name: "Henderson Campus", location: [36.139, -115.129] as [number, number] },
      { name: "The Crossing", location: [36.147, -115.189] as [number, number] },
      { name: "West Charleston", location: [36.159, -115.205] as [number, number] }
    ]
  }
];

// This component is now imported as RoutesPage in App.tsx
export default function Routes() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId === selectedRouteId ? null : routeId);
  };
  
  const selectedRoute = selectedRouteId 
    ? routes.find(route => route.id === selectedRouteId)
    : null;
    
  const filteredRoutes = routes.filter(route => {
    if (filter === 'all') return true;
    return route.status === filter;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-csn-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Bus Routes</h1>
            <p className="opacity-90">View all available campus transit routes and their schedules</p>
          </div>
        </div>
        
        {/* Routes and Map Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Routes List */}
              <div className="lg:w-1/2 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-csn-blue">All Routes</h2>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="limited">Limited Service</SelectItem>
                      <SelectItem value="inactive">Not Operating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {filteredRoutes.map(route => (
                    <div 
                      key={route.id}
                      onClick={() => handleRouteSelect(route.id)}
                      className={`cursor-pointer transition-all ${selectedRouteId === route.id ? 'ring-2 ring-csn-blue' : ''}`}
                    >
                      <RouteCard 
                        id={route.id}
                        name={route.name}
                        color={route.color}
                        startLocation={route.startLocation}
                        endLocation={route.endLocation}
                        frequency={route.frequency}
                        operatingHours={route.operatingHours}
                        status={route.status}
                      />
                    </div>
                  ))}
                  
                  {filteredRoutes.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No routes match the selected filter.</p>
                      <Button 
                        variant="ghost" 
                        className="mt-2" 
                        onClick={() => setFilter('all')}
                      >
                        Show all routes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Map */}
              <div className="lg:w-1/2">
                <div className="sticky top-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-csn-blue mb-4">Route Map</h2>
                  
                  <RouteMap routes={selectedRoute ? [selectedRoute] : undefined} />
                  
                  <div className="mt-4 text-sm text-gray-500">
                    {selectedRoute ? (
                      <p>Showing {selectedRoute.name} route and stops.</p>
                    ) : (
                      <p>Select a route from the list to view it on the map.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
