"use client";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import useAuthStore from "@/store/useAuthStore";

export default function FarmerDashboard() {
  const role = useAuthStore((state) => state.role);

  return (
    <RoleGuard allowed={[ROLES.FARMER]}>
        <div className="bg-white text-gray-900 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">🌱 Farmer Dashboard</h2>
      <p className="text-black">Log collections, capture GPS, upload species & quantity.</p>
        </div>
    </RoleGuard>
  );
}
