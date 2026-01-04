"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden rounded-full"
      suppressHydrationWarning
    >
      <Sun
        className={cn(
          "absolute size-6 transition-all duration-1000 ease-in-out text-yellow-400",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />

      <Moon
        className={cn(
          "absolute size-6 transition-all duration-1000 ease-in-out",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </Button>
  );
}
