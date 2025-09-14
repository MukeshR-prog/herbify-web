"use client";
import { useRouter } from "next/navigation";
import { ROLES } from "@/utils/roles";
import { login, restoreSession } from "@/lib/auth";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    restoreSession();
    // if (role) {
    //   router.push(`/${role}`);
    // }
  }, [role, router]);

  const handleLogin = (r) => {
    login(r);
    router.push(`/${r}`);
  };

  return (
    <div className="p-6 bg-white text-gray-900 rounded-xl shadow max-w-md mx-auto min-h-screen">
  <h2 className="text-2xl font-bold mb-4 text-black">Login as</h2>
      <div className="grid gap-3">
        {Object.values(ROLES).map((r) => (
          <button
            key={r}
            onClick={() => handleLogin(r)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
