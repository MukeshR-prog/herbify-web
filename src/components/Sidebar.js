"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Leaf,
  ShieldCheck,
  PackagePlus,
  Truck,
  Box,
  ClipboardList,
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
    { label: "Dashboard", href: "/consumer" },
    { label: "Journey Tracker", href: "/consumer/journey-tracker" },
    { label: "Lab Reports", href: "/consumer/lab-reports" },
    { label: "Analytics", href: "/consumer/analytics" },
    { label: "Sustainability", href: "/consumer/sustainability" },
  ],
};

export function Sidebar({ role }) {
  const pathname = usePathname();

  if (!role || !sidebarContent[role]) return null;

  return (
    <aside className="hidden md:flex w-60 min-h-screen bg-gray-50 border-r border-gray-200 p-4 flex-col gap-2">
      <div className="flex-1 space-y-2 py-4">
         {sidebarContent[role].map((item) => {
        const isBaseRoute = item.href === `/${role.toLowerCase()}`;
        const isActive = isBaseRoute
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + "/");
         
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-[#64ae40] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span
                className={`transition-all duration-200 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-emerald-500"
                }`}
              >
                {icons[item.label]}
              </span>
              <span
                className={`transition-all duration-200 text-[16px] ${
                  isActive ? "" : "group-hover:text-gray-900"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
