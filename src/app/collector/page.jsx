"use client";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";

export default function CollectorDashboard() {
  return (
    <RoleGuard allowed={[ROLES.COLLECTOR]}>
      <h2 className="text-2xl font-bold mb-4">🚚 Collector Dashboard</h2>
      <p>Scan packages, verify authenticity, transfer custody.</p>
    </RoleGuard>
  );
}
