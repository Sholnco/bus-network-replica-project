
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertOctagon, Clock, Calendar, MapPin } from "lucide-react";

// Mock alerts data
const alerts = [
  {
    id: "alert-1",
    title: "Orange Line Limited Service",
    description: "Due to road construction on East Flamingo Road, the Orange Line is operating with limited service. Expect delays of 10-15 minutes.",
    type: "warning",
    affectedRoutes: ["Orange Line"],
    timestamp: "2023-05-03T08:30:00Z",
    expiresAt: "2023-05-20T23:59:59Z"
  },
  {
    id: "alert-2",
    title: "Temporary Stop Relocation",
    description: "The Downtown Terminal stop has been temporarily relocated to Carson Avenue due to a special event. Look for signs directing to the temporary stop location.",
    type: "info",
    affectedRoutes: ["Blue Line", "Green Line"],
    timestamp: "2023-05-01T12:00:00Z",
    expiresAt: "2023-05-05T23:59:59Z"
  },
  {
    id: "alert-3",
    title: "Weekend Schedule Changes",
    description: "All routes will operate on modified weekend schedules for the upcoming holiday weekend. Last buses will depart at 4:00 PM on Sunday.",
    type: "info",
    affectedRoutes: ["Blue Line", "Green Line", "Orange Line"],
    timestamp: "2023-05-02T09:15:00Z",
    expiresAt: "2023-05-07T23:59:59Z"
  },
  {
    id: "alert-4",
    title: "Service Suspension Notice",
    description: "All bus services will be suspended on May 15th due to campus-wide maintenance. Regular service will resume on May 16th at the normal time.",
    type: "critical",
    affectedRoutes: ["All Routes"],
    timestamp: "2023-05-01T10:00:00Z",
    expiresAt: "2023-05-16T05:00:00Z"
  }
];

export default function Alerts() {
  // Function to format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Get alert icon based on type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Get alert badge based on type
  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      default:
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Info</Badge>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-csn-blue text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Service Alerts</h1>
            <p className="opacity-90">Current service disruptions and important notices</p>
          </div>
        </div>
        
        {/* Alerts Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              {alerts.map(alert => (
                <Alert key={alert.id} className={`
                  border-l-4 
                  ${alert.type === 'critical' ? 'border-l-red-500' : 
                    alert.type === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-500'}
                `}>
                  <div className="flex items-start">
                    <div className="mr-4">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <AlertTitle>{alert.title}</AlertTitle>
                        {getAlertBadge(alert.type)}
                      </div>
                      <AlertDescription className="mt-2">{alert.description}</AlertDescription>
                      
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Affects: {alert.affectedRoutes.join(", ")}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Posted: {formatDate(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Valid until: {formatDate(alert.expiresAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Current Alerts</h3>
                  <p className="text-gray-600">All routes are currently operating on their normal schedules.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-csn-blue mb-2">Stay Informed</h3>
            <p className="text-gray-600 mb-4">Sign up to receive service alerts via email or text message.</p>
            <a 
              href="/subscribe" 
              className="inline-flex items-center px-4 py-2 bg-csn-blue text-white rounded-md hover:bg-csn-darkblue transition-colors"
            >
              Subscribe to Alerts
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
