"use client";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { logout } from "@/lib/auth";

export function Navbar() {
  const role = useAuthStore((state) => state.role);

  return (
    <nav className="flex gap-4 p-4 bg-green-100 shadow">
      <Link href="/">Home</Link>
      {role && <Link href={`/${role}`}>Dashboard</Link>}
      {!role && <Link href="/login">Login</Link>}
      {role && (
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      )}
    </nav>
  );
}
