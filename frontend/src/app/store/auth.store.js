// store/useAuthStore.js
import { create } from "zustand";
import { login, logout, me, signup } from "../services/auth.services";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  signupUser: async (formData) => {
    try {
      set({ loading: true, error: null });

      const data = await signup(formData);

      set({
        user: data.user,
        loading: false,
        isAuthenticated: true,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        loading: false,
        isAuthenticated: false,
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
        isAuthenticated: true,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
        isAuthenticated: false,
      });
      return false;
    }
  },

  getProfile: async () => {
    try {
      set({ loading: true, error: null });
      const data = await me();
      set({
        user: data,
        loading: false,
        isAuthenticated: true
      });
      return true;
    } catch (err) {
      set({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await logout();
      set({
        user: null,
        error: null,
        isAuthenticated: false
      });
      return true;
    } catch (err) {
      set({
        user: null,
        error: null,
        isAuthenticated: false
      });
      return true;
    }
  },
}));