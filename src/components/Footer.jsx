import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TourMate. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-gray-400">
          Crafted with 💙
        </p>
      </div>
    </footer>
  );
};

export default Footer;
