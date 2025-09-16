/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Leaf, PackagePlus, Box, Truck } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { logout } from "@/lib/auth";
import { ROLES } from "@/utils/roles";
import {
  LayoutDashboard,
  Package,
  Clock,
  LineChart,
  Repeat,
  ShoppingCart,
  List,
  Sprout,
  DollarSign,
  FlaskConical,
  Factory,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const icons = {
  Dashboard: <LayoutDashboard size={18} />,
  "Consumer Dashboard": <LayoutDashboard size={18} />,
  "Farmer Dashboard": <LayoutDashboard size={18} />,
  "Stock Details": <Package size={18} />,
  "Existing Stock": <Package size={18} />,
  "Pending Requests": <Clock size={18} />,
  "ML Analysis": <LineChart size={18} />,
  Transactions: <Repeat size={18} />,
  Shop: <ShoppingCart size={18} />,
  Orders: <List size={18} />,
  "My Crops": <Sprout size={18} />,
  Sales: <DollarSign size={18} />,
  "Journey Tracker": <Factory size={18} />,
  "Lab Reports": <FlaskConical size={18} />,
  Analytics: <BarChart3 size={18} />,
  Sustainability: <Leaf size={18} />,
  "Quality Tracking": <ShieldCheck size={18} />,
  "Incoming Stock": <PackagePlus size={18} />,
  "Under Processing": <Factory size={18} />,
  "Products to Dispatch": <Box size={18} />,
  "Products Dispatched": <Truck size={18} />,
};

const sidebarContent = {
 [ROLES.COLLECTOR]: [
    { label: "Dashboard", href: "/collector" },
    { label: "Stock Details", href: "/collector/stock" },
    { label: "Pending Requests", href: "/collector/farmer-request" },
    { label: "ML Analysis", href: "/collector/ml-analysis" },
    { label: "Transactions", href: "/collector/transactions" },
  ],
  [ROLES.MANUFACTURER]: [
    { label: "Dashboard", href: "/manufacturer" },
    // { label: "Incoming Stock", href: "/manufacturer/incoming-stock" },
    { label: "Existing Stock", href: "/manufacturer/existing-stock" },
    { label: "Under Processing", href: "/manufacturer/processing" },
    // { label: "Products to Dispatch", href: "/manufacturer/pending-dispatch" },
    { label: "Products Dispatched", href: "/manufacturer/dispatched" },
    // { label: "Orders", href: "/manufacturer/orders" },
  ],
  [ROLES.FARMER]: [
    { label: "Farmer Dashboard", href: "/farmer" },
    { label: "My Crops", href: "/farmer/crops" },
    { label: "Sales", href: "/farmer/sales" },
  ],
  [ROLES.CONSUMER]: [
    { label: "Dashboard", href: "/manufacturer" },
    { label: "Journey Tracker", href: "/manufacturer/production" },
    { label: "Lab Reports", href: "/manufacturer/inventory" },
    { label: "Analytics", href: "/manufacturer/analytics" },
    { label: "Sustainability", href: "/manufacturer/sustainability" },
  ],
};

export function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const role = useAuthStore((state) => state.role);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    logout();
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex gap-2 h-12.5">
              <img src="/logo.png" alt="Herbify Logo" width={50} />
              <img
                src="/name.png"
                className="mt-[-12px]"
                alt="Herbify Logo"
                width={140}
              />
            </div>

            {/* Desktop - Just logout button */}
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
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
        </div>
      </nav>

      {/* Mobile Drawer Menu - Shows Sidebar Links */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  HerBChain
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              <MobileSidebar
                role={role}
                onLinkClick={() => setMobileMenuOpen(false)}
              />
            </div>

            {/* Mobile Logout */}
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Mobile version of Sidebar component
function MobileSidebar({ role, onLinkClick }) {
  const pathname = usePathname();

  if (!role || !sidebarContent[role]) return null;

  return (
    <div className="p-4 space-y-2">
      {sidebarContent[role].map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition
              ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            <span className="text-gray-500">{icons[item.label]}</span>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
