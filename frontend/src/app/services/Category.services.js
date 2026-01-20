import api from "./api";

export const createCateGories = async (categoryName) => {
  const res = await api.post("/category/create",categoryName)
  return res.data;
};
export const getCateGories = async () => {
  const res = await api.get("/category/get")
  return res.data;
};
export const updateCateGories = async (categoryId,newName) => {
  const res = await api.put(`/category/update/${categoryId}`,newName)
  return res.data;
};
export const deleteCateGories = async (categoryId) => {
  const res = await api.delete(`/category/delete/${categoryId}`)
  return res.data;
};
