import {create} from "zustand"
import { login, signup } from "../services/auth.services";
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
    console.log(formData)
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
}));


