
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="container px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-csn-blue rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-csn-blue mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. The bus might have taken a wrong turn.
            </p>
            <Button asChild className="bg-csn-blue hover:bg-csn-darkblue">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
