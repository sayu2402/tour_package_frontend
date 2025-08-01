import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand logo/title */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-white text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
            >
              🌍 TourMate
            </Link>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 text-lg font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-white hover:text-yellow-300 text-lg font-medium transition"
            >
              Packages
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
