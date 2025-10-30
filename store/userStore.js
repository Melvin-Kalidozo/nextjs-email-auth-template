// /store/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  role: null,
  loading: true,

  setUser: (user, role) => set({ user, role, loading: false }),
  clearUser: () => set({ user: null, role: null, loading: false }),
}));
