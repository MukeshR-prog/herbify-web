"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export function RoleGuard({ allowed, children }) {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (!role) {
      router.replace("/login");
    } else if (!allowed.includes(role)) {
      router.replace("/login");
    }
  }, [role, allowed, router]);

  if (!role || !allowed.includes(role)) return null;

  return <>{children}</>;
}
