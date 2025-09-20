import {
  Home,
  Leaf,
  Recycle,
  Milk, // replaced Cow with Activity icon
  DollarSign,
  Package,
  Users,
  BarChart,
  Settings,
  Wheat,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Crop Management", icon: Leaf, path: "/dashboard/crops" },
  { name: "Compost Management", icon: Recycle, path: "/dashboard/compost" },
  { name: "Livestock Management", icon: Milk, path: "/dashboard/livestock" },
  { name: "Revenue Management", icon: DollarSign, path: "/dashboard/revenue" },
  { name: "Inventory Management", icon: Package, path: "/dashboard/inventory" },
  { name: "Farmers", icon: Wheat, path: "/dashboard/farmers" },
  { name: "Handlers", icon: Users, path: "/dashboard/handlers" },
  { name: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];


export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Brand (Logo Placeholder) */}
      <div className="p-3 flex items-center justify-center text-2xl font-extrabold text-green-700 tracking-tight">
        {/* Placeholder for logo image */}
        <img
          src="../src/assets/logo.png" // Replace with your logo path
          alt="AgriAdmin Logo"
          className="w-45 h-45 object-contain" // Adjust size as needed
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  "text-gray-700 hover:bg-green-50 hover:text-green-700",
                  isActive ? "bg-green-100 text-green-800 font-semibold" : "",
                ].join(" ")
              }
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / version / credits */}
      <div className="p-4 text-xs text-gray-400 border-t">
        © {new Date().getFullYear()} LankaAgriLife
      </div>
    </aside>
  );
}
