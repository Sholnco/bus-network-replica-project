
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScheduleTable from '@/components/ScheduleTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock schedule data
const mockScheduleData = {
  routes: [
    {
      id: "1",
      name: "Blue Line",
      stops: [
        {
          name: "Charleston Campus",
          times: {
            weekday: ["6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM"],
            weekend: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"]
          }
        },
        {
          name: "Downtown Terminal",
          times: {
            weekday: ["6:15 AM", "6:45 AM", "7:15 AM", "7:45 AM", "8:15 AM", "8:45 AM"],
            weekend: ["8:20 AM", "9:20 AM", "10:20 AM", "11:20 AM"]
          }
        },
        {
          name: "Henderson Campus",
          times: {
            weekday: ["6:45 AM", "7:15 AM", "7:45 AM", "8:15 AM", "8:45 AM", "9:15 AM"],
            weekend: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
          }
        }
      ]
    },
    {
      id: "2",
      name: "Green Line",
      stops: [
        {
          name: "North Las Vegas Campus",
          times: {
            weekday: ["6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM"],
            weekend: ["8:00 AM", "9:00 AM", "10:00 AM"]
          }
        },
        {
          name: "Civic Center",
          times: {
            weekday: ["6:20 AM", "6:50 AM", "7:20 AM", "7:50 AM", "8:20 AM"],
            weekend: ["8:25 AM", "9:25 AM", "10:25 AM"]
          }
        },
        {
          name: "Charleston Campus",
          times: {
            weekday: ["6:40 AM", "7:10 AM", "7:40 AM", "8:10 AM", "8:40 AM"],
            weekend: ["8:45 AM", "9:45 AM", "10:45 AM"]
          }
        }
      ]
    },
    {
      id: "3",
      name: "Orange Line",
      stops: [
        {
          name: "Henderson Campus",
          times: {
            weekday: ["7:00 AM", "7:45 AM", "8:30 AM", "9:15 AM"],
            weekend: ["9:00 AM", "10:30 AM", "12:00 PM"]
          }
        },
        {
          name: "The Crossing",
          times: {
            weekday: ["7:25 AM", "8:10 AM", "8:55 AM", "9:40 AM"],
            weekend: ["9:30 AM", "11:00 AM", "12:30 PM"]
          }
        },
        {
          name: "West Charleston",
          times: {
            weekday: ["7:45 AM", "8:30 AM", "9:15 AM", "10:00 AM"],
            weekend: ["10:00 AM", "11:30 AM", "1:00 PM"]
          }
        }
      ]
    }
  ]
};

export default function Schedules() {
  const [selectedRouteId, setSelectedRouteId] = useState("1");
  const [dayType, setDayType] = useState<'weekday' | 'weekend'>('weekday');
  
  const selectedRoute = mockScheduleData.routes.find(
    route => route.id === selectedRouteId
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-csn-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Bus Schedules</h1>
            <p className="opacity-90">View departure and arrival times for all campus routes</p>
          </div>
        </div>
        
        {/* Schedule Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-csn-blue">Route Schedules</h2>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <Select value={selectedRouteId} onValueChange={setSelectedRouteId}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Route" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockScheduleData.routes.map(route => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Tabs defaultValue="weekday" value={dayType} onValueChange={(value) => setDayType(value as 'weekday' | 'weekend')}>
                    <TabsList>
                      <TabsTrigger value="weekday">Weekday</TabsTrigger>
                      <TabsTrigger value="weekend">Weekend</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              {selectedRoute && (
                <ScheduleTable 
                  routeName={selectedRoute.name}
                  routeId={selectedRoute.id}
                  stops={selectedRoute.stops}
                  day={dayType}
                />
              )}
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="font-medium">Schedule Notes:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>All times are approximate and subject to traffic conditions.</li>
                  <li>No service on major holidays: New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving Day, and Christmas Day.</li>
                  <li>Reduced service during semester breaks and summer sessions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Legend Section */}
        <section className="py-6 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-semibold text-csn-blue mb-4">Route Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#0047AB] mr-2"></div>
                  <h4 className="font-medium">Blue Line</h4>
                </div>
                <p className="text-sm text-gray-600">Connects Charleston Campus to Henderson Campus via Downtown Terminal.</p>
                <p className="text-sm text-gray-600 mt-1">Every 30 minutes, 6:00 AM - 10:00 PM</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#008000] mr-2"></div>
                  <h4 className="font-medium">Green Line</h4>
                </div>
                <p className="text-sm text-gray-600">Connects North Las Vegas Campus to Charleston Campus via Civic Center.</p>
                <p className="text-sm text-gray-600 mt-1">Every 30 minutes, 6:00 AM - 9:00 PM</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF6B35] mr-2"></div>
                  <h4 className="font-medium">Orange Line</h4>
                </div>
                <p className="text-sm text-gray-600">Connects Henderson Campus to West Charleston via The Crossing.</p>
                <p className="text-sm text-gray-600 mt-1">Every 45 minutes, 7:00 AM - 8:00 PM</p>
                <p className="text-xs text-yellow-600 mt-1">Limited service due to road construction</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
