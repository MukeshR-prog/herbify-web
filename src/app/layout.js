"use client";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./providers";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);
  const pathname = usePathname(); // ✅ correct usage of the hook

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/store/useAuthStore").then((mod) => {
        setRole(mod.default.getState().role);
        mod.default.subscribe((state) => setRole(state.role));
      });
    }
  }, []);

  // ✅ Sidebar only on role dashboards, not on `/` or `/login`
  const showSidebar =
    role &&
    pathname &&
    pathname !== "/" &&
    !pathname.startsWith("/login");

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Navbar />
          <div className="flex h-[calc(100vh-64px)]">{/* 64px for navbar height */}
            {showSidebar && <Sidebar role={role} />}
            <main className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-64px)]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
