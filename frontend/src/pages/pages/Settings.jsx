import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Settings() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin-theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark") ||
             window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="mb-4 text-2xl font-bold">⚙️ Settings</h1>
      <p className="mb-6">
        Customize your system preferences and configurations.
      </p>

      {/* Dark Mode Toggle Card */}
      <div className="max-w-md p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Theme Preferences</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Switch between light and dark mode
            </p>
          </div>
          <button
            onClick={() => setDark((prev) => !prev)}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Current mode: <span className="font-medium">{dark ? "Dark" : "Light"}</span>
        </div>
      </div>
    </div>
  );
}