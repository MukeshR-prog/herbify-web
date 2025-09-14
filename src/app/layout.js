"use client";
import "./globals.css";
import { LandingNavbar } from "@/components/navbars/LandingNavbar";
import { DashboardNavbar } from "@/components/navbars/DashboardNavbar";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./providers";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/store/useAuthStore").then((mod) => {
        setRole(mod.default.getState().role);
        mod.default.subscribe((state) => setRole(state.role));
      });
    }
  }, []);

  const isLandingPage = pathname === "/";
  const isLoginPage = pathname === "/login";

  const showSidebar = role && !isLandingPage && !isLoginPage;

  return (
    <html lang="en">
      <body className="min-h-screen ">
        <Providers>
          {/* Navbar */}
          {isLandingPage ? <LandingNavbar /> : <DashboardNavbar />}

          {/* Layout */}
          <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Sidebar */}
            {showSidebar && <Sidebar role={role} />}

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto scrollbar-hide p-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
