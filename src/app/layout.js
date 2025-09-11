import "./globals.css";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
