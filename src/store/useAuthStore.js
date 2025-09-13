import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ROLES } from "@/utils/roles";

const useAuthStore = create(
  persist(
    (set) => ({
      role: null,
      login: (role) => set({ role }),
      logout: () => set({ role: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
