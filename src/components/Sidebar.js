"use client";
import { ROLES } from "@/utils/roles";
import Link from "next/link";

const sidebarContent = {
  [ROLES.COLLECTOR]: [
    { label: "Dashboard", href: "/collector" },
    { label: "Add Stock", href: "/collector/add-stock" },
    { label: "Existing Stock", href: "/collector/existing-stock" },
    { label: "Pending Requests", href: "/collector/farmer-request" },
    { label: "ML Analysis", href: "/collector/ml-analysis" },
    { label: "Transactions", href: "/collector/transactions" },
  ],
  [ROLES.CONSUMER]: [
    { label: "Consumer Dashboard", href: "/consumer" },
    { label: "Shop", href: "/consumer/shop" },
    { label: "Orders", href: "/consumer/orders" },
  ],
  [ROLES.FARMER]: [
    { label: "Farmer Dashboard", href: "/farmer" },
    { label: "My Crops", href: "/farmer/crops" },
    { label: "Sales", href: "/farmer/sales" },
  ],
  [ROLES.MANUFACTURER]: [
    { label: "Manufacturer Dashboard", href: "/manufacturer" },
    { label: "Production", href: "/manufacturer/production" },
    { label: "Inventory", href: "/manufacturer/inventory" },
  ],
};

export function Sidebar({ role }) {
  if (!role || !sidebarContent[role]) return null;
  return (
    <aside className="w-56 min-h-screen bg-green-50 p-4 flex flex-col gap-2 shadow">
      {sidebarContent[role].map((item) => (
        <Link key={item.href} href={item.href} className="hover:bg-green-200 rounded px-2 py-1">
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
