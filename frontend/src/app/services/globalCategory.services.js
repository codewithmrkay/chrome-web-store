import api from "./api";

export const getGlobalCateGories = async () => {
  const res = await api.get("/admin/categories")
  return res.data;
};
