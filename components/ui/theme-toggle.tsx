"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme ?? resolvedTheme;

  const toggleTheme = () => {
    setIsToggling(true);

    setTimeout(() => {
      setTheme(currentTheme === "dark" ? "light" : "dark");
      setTimeout(() => setIsToggling(false), 250);
    }, 100);
  };

  return (
    <div className="fixed bottom-16 left-2 z-50 group">
      <div className="backdrop-blur-xl bg-background/20 border border-border/50 rounded-full p-1.5 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1">
        <button
          onClick={toggleTheme}
          disabled={isToggling}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transform transition-all duration-500 ease-in-out
            ${currentTheme === "dark" ? "bg-slate-900 text-blue-100 shadow-inner" : "bg-white text-orange-600 shadow-inner"}
            hover:scale-105 active:scale-95
            ${isToggling ? "scale-110" : "scale-100"}
          `}
        >
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-500 ease-in-out
              ${currentTheme === "dark"
                ? " from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100"
                : " from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100"
              }
            `}
          />
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all absolute
              ${currentTheme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"}
            `}
          />
          <Moon
            className={`h-[1.2rem] w-[1.2rem] transition-all absolute
              ${currentTheme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"}
            `}
          />
          {isToggling && (
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse transition-opacity duration-300" />
          )}
        </button>
      </div>
    </div>
  );
}
