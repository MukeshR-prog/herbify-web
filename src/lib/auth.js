import useAuthStore from "@/store/useAuthStore";

export const getSessionRole = () => {
  return useAuthStore.getState().role;
};

export const login = (role) => {
  useAuthStore.getState().login(role);
  localStorage.setItem("role", role);
};

export const logout = () => {
  useAuthStore.getState().logout();
  localStorage.removeItem("role");
};

// Restore session from localStorage
export const restoreSession = () => {
  const saved = localStorage.getItem("role");
  if (saved) {
    useAuthStore.getState().login(saved);
  }
};
