import { create } from "zustand"
import { login, logout, me, signup } from "../services/auth.services";
export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signupUser: async (formData) => {
    try {
      set({ loading: true, error: null });

      const data = await signup(formData);

      set({
        user: data.user,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        loading: false,
      });
      return false;
    }
  },
  login: async (formData) => {
    try {
      set({ loading: true, error: null });

      const data = await login(formData);

      set({
        user: data.user,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        loading: false,
      });
      return false;
    }
  },
  getProfile: async () => {
    try {
      set({ loading: true, error: null });
      const data = await me();
      set({ user: data, loading: false });
      return true;
    } catch (err) {
      set({ user: null, loading: false, error: null }); // Clear user if token invalid
      return false;
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ user: null, error: null });
      return true;
    } catch (err) {
      set({ user: null, error: null }); // Clear anyway
      return true;
    }
  },
}));


