"use client"
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {/* <Navbar /> */}
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
