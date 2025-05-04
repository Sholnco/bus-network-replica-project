
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Search,
  MapPin,
  Clock,
  Info,
  HelpCircle
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-csn-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CSN Bus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-csn-orange transition-colors">
              Home
            </Link>
            <Link to="/routes" className="hover:text-csn-orange transition-colors">
              Routes
            </Link>
            <Link to="/schedules" className="hover:text-csn-orange transition-colors">
              Schedules
            </Link>
            <Link to="/alerts" className="hover:text-csn-orange transition-colors">
              Alerts
            </Link>
            <Link to="/faqs" className="hover:text-csn-orange transition-colors">
              FAQs
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-csn-blue">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-csn-darkblue animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="py-2 px-3 hover:bg-csn-blue rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/routes" 
                className="py-2 px-3 hover:bg-csn-blue rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Routes
              </Link>
              <Link 
                to="/schedules" 
                className="py-2 px-3 hover:bg-csn-blue rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Clock className="h-4 w-4 mr-2" />
                Schedules
              </Link>
              <Link 
                to="/alerts" 
                className="py-2 px-3 hover:bg-csn-blue rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 mr-2" />
                Alerts
              </Link>
              <Link 
                to="/faqs" 
                className="py-2 px-3 hover:bg-csn-blue rounded-md flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </Link>
              <div className="pt-2 border-t border-csn-blue">
                <Button variant="outline" size="sm" className="w-full border-white text-white hover:bg-white hover:text-csn-blue">
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
