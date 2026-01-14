import api from './api';

export const GlobalShortcutService = {
  getAllShortcuts: async () => {
    const response = await api.get('admin/shortcuts'); 
    return response.data;
  },
  
  updateStarCount: async (globalShortcutid, userCategoryId) => {
    const response = await api.put(`/shortcut/updatestar/${globalShortcutid}`,userCategoryId);
    return response.data;
  }
};