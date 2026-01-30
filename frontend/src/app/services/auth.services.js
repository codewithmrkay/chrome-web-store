// services/auth.services.js
import api from "./api";

export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);

  // Save token if returned
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  // Save token to localStorage
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } finally {
    // Always remove token, even if API call fails
    localStorage.removeItem("token");
  }
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};