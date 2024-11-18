import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logos/Light.png";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  AlertCircle,
  LogOut,
  User,
  Leaf,
} from "lucide-react";

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-eco-green-50 to-eco-green-100 shadow-sm border-b border-eco-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-white/80 group-hover:bg-white 
              transition-all duration-300 shadow-sm">
              <Leaf className="h-8 w-8 text-green-600 
                group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-extrabold text-2xl tracking-wider text-gray-800">
              Bin Buddy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link group flex flex-col items-center 
                text-gray-600 hover:text-green-700 transition-colors duration-300
                ${isActiveLink("/") && "text-green-700 font-semibold"}`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span>Home</span>
            </Link>

            <Link
              to="/raise-issue"
              className={`nav-link group flex flex-col items-center 
                text-gray-600 hover:text-green-700 transition-colors duration-300
                ${
                  isActiveLink("/raise-issue") && "text-green-700 font-semibold"
                }`}
            >
              <AlertCircle className="w-5 h-5 mb-1" />
              <span>Issue</span>
            </Link>

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-white text-green-600 rounded-full font-semibold
                    transition-all duration-300 
                    border border-green-200
                    hover:bg-green-600 hover:text-white
                    hover:shadow-md hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold
                    transition-all duration-300
                    border border-green-600
                    hover:bg-green-700
                    hover:shadow-md hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full
                    text-gray-700 hover:bg-white/60 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium">{username}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-2 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 
                        hover:text-red-600 flex items-center space-x-2
                        transition-colors duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 
              hover:bg-white/60 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {/* ... Mobile menu content remains the same ... */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
