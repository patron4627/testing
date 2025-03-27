
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-xl font-medium mb-4">Culina</h3>
            <p className="text-primary-foreground/80 text-sm max-w-xs text-center md:text-left">
              Discover a culinary journey that celebrates simplicity, quality ingredients, and exquisite presentation.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-xl font-medium mb-4">Contact</h3>
            <div className="flex flex-col space-y-3">
              <span className="flex items-center text-primary-foreground/80 text-sm">
                <MapPin size={16} className="mr-2" />
                123 Gourmet Avenue, Foodtown
              </span>
              <span className="flex items-center text-primary-foreground/80 text-sm">
                <Phone size={16} className="mr-2" />
                (123) 456-7890
              </span>
              <span className="flex items-center text-primary-foreground/80 text-sm">
                <Mail size={16} className="mr-2" />
                info@culinarestaurant.com
              </span>
              <span className="flex items-center text-primary-foreground/80 text-sm">
                <Clock size={16} className="mr-2" />
                Mon-Sun: 11am - 10pm
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-xl font-medium mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition">
                Home
              </Link>
              <Link to="/menu" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition">
                Menu
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition">
                Contact
              </Link>
              <Link to="/admin" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition">
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="text-primary-foreground/60 text-xs">
            © {new Date().getFullYear()} Culina Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
