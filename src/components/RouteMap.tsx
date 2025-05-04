
import { useEffect, useRef } from 'react';

interface RouteMapProps {
  routes?: Array<{
    id: string;
    name: string;
    color: string;
    path: Array<[number, number]>;
    stops: Array<{
      name: string;
      location: [number, number];
    }>;
  }>;
  center?: [number, number];
  zoom?: number;
}

export default function RouteMap({ 
  routes = [],
  center = [36.1699, -115.1398], // Default to Las Vegas coordinates
  zoom = 13 
}: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // In a real app, we would initialize a map library here like Google Maps or Leaflet
    // For this demo, we'll just display placeholder content
    
    const initMap = () => {
      if (!mapContainerRef.current) return;
      
      // Create a placeholder for the map
      const placeholderMap = document.createElement('div');
      placeholderMap.className = 'w-full h-full bg-csn-lightblue flex items-center justify-center';
      placeholderMap.innerHTML = `
        <div class="text-center p-4">
          <h3 class="text-lg font-semibold text-csn-blue mb-2">Interactive Bus Map</h3>
          <p class="text-gray-600">Map showing CSN bus routes and stops would display here</p>
          <p class="text-sm text-gray-500 mt-4">Center: ${center[0].toFixed(4)}, ${center[1].toFixed(4)} | Zoom: ${zoom}</p>
          <div class="mt-4 grid grid-cols-${routes.length > 0 ? '2' : '1'} gap-2">
            ${routes.map(route => `
              <div class="flex items-center p-2 bg-white rounded-md shadow-sm">
                <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${route.color || '#0047AB'}"></div>
                <span class="text-sm">${route.name}</span>
              </div>
            `).join('')}
            ${routes.length === 0 ? `
              <div class="p-2 bg-white rounded-md shadow-sm">
                <span class="text-sm">No routes selected</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      
      // Clear any existing content and append the placeholder
      mapContainerRef.current.innerHTML = '';
      mapContainerRef.current.appendChild(placeholderMap);
      
      // Store reference to map (in a real app, this would be the map instance)
      mapRef.current = placeholderMap;
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        // In a real app, we would destroy the map instance here
      }
    };
  }, [center, zoom, routes]);
  
  return (
    <div className="route-map-container border border-gray-200" ref={mapContainerRef}>
      {/* Map will be rendered here by the useEffect */}
    </div>
  );
}
