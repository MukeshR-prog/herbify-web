"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/scan-qr",
  "/consumer"
  // Add other public routes here
];

export function RoleGuard({ allowed, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    // Skip authentication check for public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
      return;
    }

    if (!role) {
      router.replace("/login");
    } else if (!allowed.includes(role)) {
      router.replace("/login");
    }
  }, [role, allowed, router, pathname]);

  // Always render children for public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  // For protected routes, only render if user has proper role
  if (!role || !allowed.includes(role)) return null;

  return <>{children}</>;
}
