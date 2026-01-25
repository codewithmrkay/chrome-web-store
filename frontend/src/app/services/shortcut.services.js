import api from "./api";


export const createShortcut = async (shortcutData) => {
  const res = await api.post("/shortcut/create", shortcutData);
  return res.data;
};
export const getShortcut = async () => {
  const res = await api.get("/shortcut/get")
  return res.data;
};
export const updateShortcut = async (shorcutId, newName, newUrl) => {
  const res = await api.put(`/shortcut/update/${shorcutId}`, newName, newUrl)
  return res.data;
};
export const deleteShortcut = async (shorcutId) => {
  const res = await api.delete(`/shortcut/delete/${shorcutId}`)
  return res.data;
};
