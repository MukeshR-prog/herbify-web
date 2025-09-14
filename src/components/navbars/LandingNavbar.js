/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setMobileMenuOpen(false); // Close mobile menu after clicking a link
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex gap-2 h-12.5">
          <img src="/logo.png" alt="Herbify Logo" width={50}/>
          <img src="/name.png" className="mt-[-12px]" alt="Herbify Logo" width={140} />
        </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, "about")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              About
            </a>
            <a
              href="#features"
              onClick={(e) => handleLinkClick(e, "features")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#workflow"
              onClick={(e) => handleLinkClick(e, "workflow")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Scan QR - Always visible */}
            <Button onPress={() => router.push("/scan-qr")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
              Scan QR
            </Button>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link href="/login">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  Try Demo
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#about"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                // onClick={() => setMobileMenuOpen(false)}
                onClick={(e) => handleLinkClick(e, "about")}
              >
                About
              </a>
              <a
                href="#features"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                // onClick={() => setMobileMenuOpen(false)}
                onClick={(e) => handleLinkClick(e, "features")}
              >
                Features
              </a>
             
              <a
                href="#workflow"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                // onClick={() => setMobileMenuOpen(false)}
                onClick={(e) => handleLinkClick(e, "workflow")}
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                // onClick={() => setMobileMenuOpen(false)}
                onClick={(e) => handleLinkClick(e, "contact")}
              >
                Contact
              </a>
              <Link href="/login">
                <button className="w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium mt-2">
                  Try Demo
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
