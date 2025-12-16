"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  //To avoid hydration error. when using next-themes with SSR, we need to wait until the component is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const handleToggleTheme = (): void => {
    console.log(resolvedTheme);
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div>
      <Button variant="ghost" size="icon" className="rounded-full" onClick={handleToggleTheme}>
        {resolvedTheme === "dark" ? <Moon className="size-6" /> : <Sun className="size-6" />}
      </Button>
    </div>
  );
}
