"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Leaf,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { logout } from "@/lib/auth";

// A utility function to handle smooth scrolling
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const role = useAuthStore((state) => state.role);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setMobileMenuOpen(false); // Close mobile menu after clicking a link
  };

  return (
    
    <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 opacity-96">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 animate-wobble">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Herbify
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              <a
                href="#about"
                onClick={(e) => handleLinkClick(e, "about")}
                className="text-gray-600 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#features"
                onClick={(e) => handleLinkClick(e, "features")}
                className="text-gray-600 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#workflow"
                onClick={(e) => handleLinkClick(e, "workflow")}
                className="text-gray-600 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 px-3 py-2 text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className="text-gray-600 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 px-3 py-2 text-sm font-medium"
              >
                Contact
              </a>
              {role && (
                <Link
                  href={`/${role}`}
                  className="text-gray-600 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            {role ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 font-medium transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="transform hover:scale-105 transition-transform duration-300">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium">
                  Try Demo
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, "about")}
              className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#features"
              onClick={(e) => handleLinkClick(e, "features")}
              className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleLinkClick(e, "workflow")}
              className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-300"
            >
              How It Works
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-300"
            >
              Contact
            </a>
            {role ? (
              <>
                <Link
                  href={`/${role}`}
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  Try Demo
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}