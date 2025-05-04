
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AlertBanner from '@/components/AlertBanner';
import RouteCard from '@/components/RouteCard';
import RouteMap from '@/components/RouteMap';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Calendar, Info } from 'lucide-react';

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

export default function Index() {
  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);
  
  const handleRouteToggle = (routeId: string) => {
    setSelectedRouteIds(prev => 
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };
  
  const selectedRoutes = routes.filter(route => 
    selectedRouteIds.includes(route.id)
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <AlertBanner 
        message="Route 3 (Orange Line) is running with limited service due to road construction." 
        type="warning" 
      />
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Routes Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-csn-blue mb-2">Campus Routes</h2>
              <p className="text-gray-600">Connecting all CSN campuses with reliable shuttle service</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map(route => (
                <RouteCard 
                  key={route.id}
                  id={route.id}
                  name={route.name}
                  color={route.color}
                  startLocation={route.startLocation}
                  endLocation={route.endLocation}
                  frequency={route.frequency}
                  operatingHours={route.operatingHours}
                  status={route.status}
                />
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline" className="border-csn-blue text-csn-blue hover:bg-csn-blue hover:text-white">
                <a href="/routes">View All Routes</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-csn-blue mb-2">Route Map</h2>
              <p className="text-gray-600">View and select routes to display on the interactive map</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6 flex flex-wrap gap-2">
                {routes.map(route => (
                  <button
                    key={route.id}
                    className={`
                      flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedRouteIds.includes(route.id)
                        ? 'bg-csn-blue text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                    onClick={() => handleRouteToggle(route.id)}
                  >
                    <span 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: route.color }}
                    ></span>
                    {route.name}
                  </button>
                ))}
              </div>
              
              <RouteMap routes={selectedRoutes.length > 0 ? selectedRoutes : undefined} />
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Select one or more routes above to display them on the map.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Information Tiles */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-csn-blue mb-2">Transit Information</h2>
              <p className="text-gray-600">Everything you need to know about our campus transportation services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Clock className="h-8 w-8 text-csn-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hours of Operation</h3>
                <p className="text-gray-600 mb-4">Buses run Monday-Friday from 6:00 AM to 10:00 PM and Saturday from 8:00 AM to 6:00 PM.</p>
                <a href="/schedules" className="text-csn-blue font-medium hover:underline">View Schedules →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <MapPin className="h-8 w-8 text-csn-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Bus Stops</h3>
                <p className="text-gray-600 mb-4">Find bus stops at all major campus locations and key points throughout the city.</p>
                <a href="/stops" className="text-csn-blue font-medium hover:underline">Find Stops →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="h-8 w-8 text-csn-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Special Events</h3>
                <p className="text-gray-600 mb-4">Check modified schedules during holidays, final exams, and campus events.</p>
                <a href="/events" className="text-csn-blue font-medium hover:underline">View Events →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Info className="h-8 w-8 text-csn-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Policies & FAQs</h3>
                <p className="text-gray-600 mb-4">Learn about bus policies, student ID requirements, and find answers to common questions.</p>
                <a href="/faqs" className="text-csn-blue font-medium hover:underline">Read More →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
