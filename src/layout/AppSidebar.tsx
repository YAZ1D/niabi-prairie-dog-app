import { useSidebar } from "../context/SidebarContext";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

// === Direct SVG imports (only ones you have) ===
import pageIcon from "../icons/page.svg";
import paperPlaneIcon from "../icons/paper-plane.svg";
import pencilIcon from "../icons/pencil.svg";
import pieChartIcon from "../icons/pie-chart.svg";
import plugInIcon from "../icons/plug-in.svg";
import plusIcon from "../icons/plus.svg";
import boxCubeIcon from "../icons/box-cube.svg";
import tableIcon from "../icons/table.svg";
import userIcon from "../icons/user-circle.svg";
import videosIcon from "../icons/videos.svg";

const menuItems = [
  { label: "Dashboard", icon: pageIcon, path: "/dashboard" },
  { label: "Burrows", icon: boxCubeIcon, path: "/burrows" },
  { label: "Observations", icon: tableIcon, path: "/observations" },
  { label: "Trends", icon: pieChartIcon, path: "/charts" },
  { label: "Profile", icon: userIcon, path: "/profile" },
  { label: "New Entry", icon: plusIcon, path: "/new" },
  { label: "Report", icon: paperPlaneIcon, path: "/report" },
  { label: "Notes", icon: pencilIcon, path: "/notes" },
  { label: "Videos", icon: videosIcon, path: "/videos" },
  { label: "Admin", icon: plugInIcon, path: "/admin" },
];

export default function AppSidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-[#133726]/95 border-r border-niabi-yellow/20 backdrop-blur-md",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      {/* === Logo / Title === */}
      <div className="flex items-center gap-3 p-4">
        <img
          src="https://i.imgur.com/LhwCuOM.png"
          alt="Niabi Zoo Logo"
          className="h-10 w-auto"
        />
        {isExpanded && (
          <h1 className="text-lg font-bold text-niabi-yellow">Niabi Zoo</h1>
        )}
      </div>

      {/* === Navigation === */}
      <nav className="mt-6 flex flex-col space-y-1 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-niabi-yellow text-niabi-deepnavy"
                  : "text-niabi-cream hover:bg-white/10 hover:text-niabi-yellow"
              )
            }
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            {isExpanded && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* === Toggle Button === */}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-niabi-cream/70 hover:text-niabi-yellow transition"
      >
        {isExpanded ? "◀" : "▶"}
      </button>
    </aside>
  );
}
