import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  Headphones, 
  MessageCircle,
  Mail,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the quick menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.quick-menu-container') && isQuickMenuOpen) {
        setIsQuickMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isQuickMenuOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Users },
    { name: "Resources", path: "/resources", icon: BookOpen },
    { name: "Events", path: "/events", icon: Calendar },
  ];

  const quickMenuItems = [
    { name: "Resources", path: "/resources", icon: BookOpen, color: "bg-gradient-to-r from-igsa-blue to-igsa-green" },
    { name: "Events", path: "/events", icon: Calendar, color: "bg-gradient-to-r from-igsa-green to-igsa-saffron" },
    { name: "About IGSA", path: "/about", icon: Users, color: "bg-gradient-to-r from-igsa-saffron to-igsa-orange" },
    { name: "FAQ", path: "/faq", icon: HelpCircle, color: "bg-gradient-to-r from-igsa-orange to-igsa-blue" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-igsa-saffron to-igsa-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold text-igsa-green">IGSA</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "text-igsa-saffron bg-igsa-saffron/10"
                        : "text-gray-700 hover:text-igsa-saffron hover:bg-igsa-saffron/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-igsa-saffron transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      location.pathname === item.path
                        ? "text-igsa-saffron bg-igsa-saffron/10"
                        : "text-gray-700 hover:text-igsa-saffron hover:bg-igsa-saffron/5"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Floating Quick Action Menu - Hidden on desktop */}
      <div className="fixed bottom-6 right-6 z-40 quick-menu-container md:hidden">
        {/* Quick Menu Items */}
        <div 
          className={cn(
            "absolute bottom-20 right-0 flex flex-col-reverse gap-4 items-end transition-all duration-500 ease-in-out origin-bottom-right",
            isQuickMenuOpen 
              ? "transform scale-100 opacity-100 translate-y-0" 
              : "transform scale-0 opacity-0 translate-y-10 pointer-events-none"
          )}
        >
          {quickMenuItems.map((item, index) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full shadow-xl whitespace-nowrap transition-all duration-300",
                item.color,
                "text-white font-medium backdrop-blur-sm border border-white/20",
                "transform hover:scale-105 hover:shadow-2xl",
                // Stagger the animation for each item
                isQuickMenuOpen ? `opacity-100 translate-x-0 transition-all delay-${index * 100}` : "opacity-0 translate-x-10"
              )}
              onClick={() => setIsQuickMenuOpen(false)}
            >
              <span>{item.name}</span>
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>

        {/* Main Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsQuickMenuOpen(!isQuickMenuOpen);
          }}
          className="bg-gradient-to-r from-igsa-saffron to-igsa-orange rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:rotate-45"
          aria-label="Quick Menu"
        >
          <div 
            className={cn(
              "w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300",
              isQuickMenuOpen ? "transform rotate-45" : ""
            )}
          >
            {isQuickMenuOpen ? (
              <X className="w-4 h-4 text-igsa-saffron" />
            ) : (
              <div className="w-2 h-2 bg-igsa-saffron rounded-full animate-pulse"></div>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
