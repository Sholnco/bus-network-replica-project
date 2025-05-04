
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-csn-darkblue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">CSN Bus</h3>
            <p className="text-sm text-gray-300">
              Providing safe and reliable transportation services for students and faculty of the College of Southern Nevada.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-csn-orange transition-colors">Home</Link></li>
              <li><Link to="/routes" className="hover:text-csn-orange transition-colors">Routes</Link></li>
              <li><Link to="/schedules" className="hover:text-csn-orange transition-colors">Schedules</Link></li>
              <li><Link to="/alerts" className="hover:text-csn-orange transition-colors">Service Alerts</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:text-csn-orange transition-colors">FAQs</Link></li>
              <li><Link to="/accessibility" className="hover:text-csn-orange transition-colors">Accessibility</Link></li>
              <li><Link to="/lost-found" className="hover:text-csn-orange transition-colors">Lost & Found</Link></li>
              <li><Link to="/contact" className="hover:text-csn-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact</h4>
            <address className="text-sm not-italic space-y-2 text-gray-300">
              <p>College of Southern Nevada</p>
              <p>Transportation Services</p>
              <p>6375 W. Charleston Blvd.</p>
              <p>Las Vegas, NV 89146</p>
              <p className="mt-2">Phone: (702) 555-1234</p>
              <p>Email: transportation@csn.edu</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} College of Southern Nevada. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
