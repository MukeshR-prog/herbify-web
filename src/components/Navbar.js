import React, { useState } from "react";
import { Menu, X, Leaf, Play, Download, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                HerBChain
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#impact"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Impact
              </a>
              <a
                href="#workflow"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Try Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#about"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                About
              </a>
              <a
                href="#features"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                Features
              </a>
              <a
                href="#impact"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                Impact
              </a>
              <a
                href="#workflow"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
              >
                Contact
              </a>
              <button className="w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Try Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}