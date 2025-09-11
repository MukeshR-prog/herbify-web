import { create } from "zustand";
import { ROLES } from "@/utils/roles";

const useAuthStore = create((set) => ({
  role: null, // no role by default
  login: (role) => set({ role }),
  logout: () => set({ role: null }),
}));

export default useAuthStore;
