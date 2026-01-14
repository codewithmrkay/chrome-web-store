import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Navbar } from "../components/navbar/Navbar";
import { useEffect } from "react";
import { useGlobalCategoryStore } from "../store/GlobalCategory.store";
import { useShortcutStore } from "../store/GlobalShortcutStore";

export const AppLayout = () => {
  const fetchCategories = useGlobalCategoryStore((state) => state.fetchCategories);
  const { fetchShortcuts } = useShortcutStore()
  // Initialize app on mount
  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([
        fetchCategories(),
        fetchShortcuts()
      ]);
    };

initializeApp();
  }, [])


return (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col px-2 w-full max-w-6xl">
      <Navbar />
      <main className="flex-1 p-2 overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  </div>
);
};


