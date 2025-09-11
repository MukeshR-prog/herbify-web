"use client";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import useAuthStore from "@/store/useAuthStore";

export default function FarmerDashboard() {
  const role = useAuthStore((state) => state.role);

  return (
    <RoleGuard allowed={[ROLES.FARMER]}>
      <h2 className="text-2xl font-bold mb-4">🌱 Farmer Dashboard</h2>
      <p>Log collections, capture GPS, upload species & quantity.</p>
    </RoleGuard>
  );
}
