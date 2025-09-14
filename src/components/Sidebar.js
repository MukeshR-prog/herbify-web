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
} from "lucide-react";

const icons = {
  Dashboard: <LayoutDashboard size={18} />,
  "Consumer Dashboard": <LayoutDashboard size={18} />,
  "Farmer Dashboard": <LayoutDashboard size={18} />,
  "Add Stock": <Package size={18} />,
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
};

const sidebarContent = {
  [ROLES.COLLECTOR]: [
    { label: "Dashboard", href: "/collector" },
    { label: "Add Stock", href: "/collector/add-stock" },
    { label: "Existing Stock", href: "/collector/existing-stock" },
    { label: "Pending Requests", href: "/collector/farmer-request" },
    { label: "ML Analysis", href: "/collector/ml-analysis" },
    { label: "Transactions", href: "/collector/transactions" },
  ],
  [ROLES.MANUFACTURER]: [
    { label: "Consumer Dashboard", href: "/consumer" },
    { label: "Shop", href: "/consumer/shop" },
    { label: "Orders", href: "/consumer/orders" },
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
    <aside className="hidden md:flex w-60 min-h-screen bg-white border-r shadow-sm p-4 flex-col gap-3">
      {sidebarContent[role].map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
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
    </aside>
  );
}
