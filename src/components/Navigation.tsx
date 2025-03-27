
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  const adminRoutes = [
    { name: "Admin", path: "/admin" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="animate-fade-in">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
            Culina
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center animate-fade-in">
          {publicRoutes.map((route, index) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "relative py-2 text-base font-medium transition-colors hover:text-primary",
                location.pathname === route.path ? "text-primary" : "text-muted-foreground",
                "overflow-hidden group"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {route.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left",
                  location.pathname === route.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
          
          {isAuthenticated && adminRoutes.map((route, index) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "relative py-2 text-base font-medium transition-colors hover:text-primary",
                location.pathname === route.path ? "text-primary" : "text-muted-foreground",
                "overflow-hidden group"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {route.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left",
                  location.pathname === route.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
          
          {!isAuthenticated && location.pathname !== "/login" && (
            <Link
              to="/login"
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Admin Login
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-primary p-2 rounded-md"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/90 backdrop-blur-lg z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8 items-center">
          {publicRoutes.map((route, index) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "text-2xl font-serif font-medium transition-colors",
                location.pathname === route.path ? "text-white" : "text-white/70 hover:text-white"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {route.name}
            </Link>
          ))}
          
          {isAuthenticated && adminRoutes.map((route, index) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "text-2xl font-serif font-medium transition-colors",
                location.pathname === route.path ? "text-white" : "text-white/70 hover:text-white"
              )}
              style={{ animationDelay: `${(index + publicRoutes.length) * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {route.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 text-2xl font-serif font-medium text-white/70 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
          
          {!isAuthenticated && location.pathname !== "/login" && (
            <Link
              to="/login"
              className="text-2xl font-serif font-medium text-white/70 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
