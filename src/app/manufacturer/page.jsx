"use client";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";

export default function ManufacturerDashboard() {
  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <h2 className="text-2xl font-bold mb-4">🏭 Manufacturer Dashboard</h2>
      <p>Create batches, request lab tests, generate product QR codes.</p>
    </RoleGuard>
  );
}
