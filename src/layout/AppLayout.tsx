import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate("/", { replace: true });
    } else {
      console.error("Error signing out:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col xl:flex-row bg-gradient-to-br from-[#143d2d] via-[#255d3f] to-[#4b865b] text-niabi-cream">
      {/* Sidebar */}
      <div className="relative">
        <AppSidebar />
        <Backdrop />
      </div>

      {/* Main area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {/* Header */}
        <header className="w-full bg-[#163c2b]/95 backdrop-blur-md border-b border-niabi-yellow/20 shadow-md flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.imgur.com/LhwCuOM.png"
              alt="Niabi Zoo Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-lg font-bold text-niabi-yellow">
              Niabi Prairie Dog Dashboard
            </h1>
          </div>

          {user && (
            <div className="flex items-center gap-4 text-sm text-niabi-cream/90">
              <span>{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-semibold text-xs transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
