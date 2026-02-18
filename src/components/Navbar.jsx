import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Target, Menu, X, Home, CheckSquare, Calendar, BarChart2, Flame } from "lucide-react";
import { useChallenge } from "../context/ChallengeContext";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getStats } = useChallenge();
  const stats = getStats();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/tracker", label: "Daily Tracker", icon: CheckSquare },
    { path: "/weeks", label: "Weekly Challenges", icon: Calendar },
    { path: "/progress", label: "Progress", icon: BarChart2 },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:block gradient-text">28-Day Challenge</span>
            <span className="sm:hidden gradient-text">Challenge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary-600 bg-primary-50 shadow-sm"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Streak badge */}
            {stats.streak > 0 && (
              <div className="flex items-center space-x-1 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full ml-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-600">{stats.streak}</span>
              </div>
            )}
          </div>

          {/* Mobile: streak + hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            {stats.streak > 0 && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-orange-50 border border-orange-200 rounded-full">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-bold text-orange-600">{stats.streak}</span>
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
