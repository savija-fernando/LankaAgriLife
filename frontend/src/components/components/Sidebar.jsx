import {
  Home,
  Leaf,
  Recycle,
  Milk,
  DollarSign,
  Package,
  Users,
  BarChart,
  Settings,
  Wheat,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// Define all possible links
const allLinks = [
  { name: "Dashboard", icon: Home, path: "/dashboard", roles: ["Admin", "Inventory Manager", "Revenue Manager", "Crop Manager", "Livestock Manager", "Compost Manager"] },
  { name: "Crop Management", icon: Leaf, path: "/dashboard/crops", roles: ["Admin", "Crop Manager"] },
  { name: "Compost Management", icon: Recycle, path: "/dashboard/compost", roles: ["Admin", "Compost Manager"] },
  { name: "Livestock Management", icon: Milk, path: "/dashboard/livestock", roles: ["Admin", "Livestock Manager"] },
  { name: "Revenue Management", icon: DollarSign, path: "/dashboard/revenue", roles: ["Admin", "Revenue Manager"] },
  { name: "Inventory Management", icon: Package, path: "/dashboard/inventory", roles: ["Admin", "Inventory Manager"] },
  { name: "Farmers", icon: Wheat, path: "/dashboard/farmers", roles: ["Admin", "Inventory Manager", "Revenue Manager", "Crop Manager", "Livestock Manager", "Compost Manager"] },
  { name: "Handlers", icon: Users, path: "/dashboard/handlers", roles: ["Admin", "Inventory Manager", "Revenue Manager", "Crop Manager", "Livestock Manager", "Compost Manager"] },
  { name: "Analytics", icon: BarChart, path: "/dashboard/analytics", roles: ["Admin", "Inventory Manager", "Revenue Manager", "Crop Manager", "Livestock Manager", "Compost Manager"] },
  { name: "Settings", icon: Settings, path: "/dashboard/settings", roles: ["Admin", "Inventory Manager", "Revenue Manager", "Crop Manager", "Livestock Manager", "Compost Manager"] },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [userRole, setUserRole] = useState("Admin");
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("adminRole") || "Admin";
    setUserRole(role);
    
    // Filter links based on user role
    const accessibleLinks = allLinks.filter(link => 
      link.roles.includes(role)
    );
    setFilteredLinks(accessibleLinks);
  }, []);

  return (
    <aside 
      className="w-64 bg-gradient-to-b from-white to-green-50 border-r border-green-100 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand Logo */}
      <div className="p-6 flex items-center justify-center border-b border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="../src/assets/icon.png"
              alt="AgriAdmin Logo"
              className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute -inset-1 bg-green-200 rounded-full blur-sm opacity-30 -z-10"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              AgriAdmin
            </h1>
            <p className="text-xs text-gray-500 font-medium">Management Suite</p>
            <p className="text-xs text-green-600 font-semibold mt-1">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                [
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                  "text-gray-600 hover:text-green-700 hover:bg-white hover:shadow-md",
                  "border border-transparent hover:border-green-200",
                  isActive 
                    ? "bg-white text-green-700 font-semibold shadow-md border-green-200" 
                    : "",
                ].join(" ")
              }
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with animation */}
              <div className={`
                relative z-10 p-1.5 rounded-lg transition-all duration-300
                group-hover:scale-110 group-hover:bg-green-100
                ${isHovered ? 'transform translate-x-0' : ''}
              `}>
                <Icon 
                  size={20} 
                  className="transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              
              {/* Text with slide animation */}
              <span className="relative z-10 font-medium transition-transform duration-300">
                {link.name}
              </span>
              
              {/* Chevron indicator */}
              <ChevronRight 
                size={16} 
                className="ml-auto text-gray-400 transition-all duration-300 group-hover:text-green-500 group-hover:translate-x-1" 
              />
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 text-center border-t border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="mb-2">
          <p className="text-xs text-gray-600 font-medium">LankaAgriLife</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} 
          <span className="block text-[10px] text-gray-400 mt-1">
            v2.1.0 • Sustainable Farming
          </span>
        </p>
      </div>
    </aside>
  );
}