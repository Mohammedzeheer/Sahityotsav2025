"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Menu, X } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Sahityotsav</span>
          </div> */}
          <div className="flex items-center space-x-2" onClick={() => handleNavigation('/')}>
            <img
              src="/assets/SAHITYOTSAV_LOGO.png"
              alt="Sahityotsav Logo"
              className="w-14 h-14 object-contain"
            />
            <img
              src="/assets/sahityotsavText.png"
              alt="Sahityotsav"
              className="h-20 object-contain filter brightness-0"
            />

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <button
              onClick={() => handleNavigation('/')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </button> */}
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('/results')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Results
            </button>
            <button
              onClick={() => handleNavigation('/photos')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Photos
            </button>
            <button
              onClick={() => handleNavigation('/events')}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Events
            </button>

            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium">
              Join Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavigation('/')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/events')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => handleNavigation('/results')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              Results
            </button>
            <button
              onClick={() => handleNavigation('/photos')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              Photos
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              About
            </button>
            <button className="w-full mt-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;