"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ToggleTheme() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (mounted === false) return null;

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
            className="relative overflow-hidden rounded-full"
        >
            <Sun
                className={cn(
                    "absolute size-6 transition-all duration-1000 ease-in-out text-yellow-400",
                    theme === 'dark'
                        ? "rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                )}
            />

            <Moon
                className={cn(
                    "absolute size-6 transition-all duration-1000 ease-in-out rotate-45",
                    theme !== 'dark'
                        ? "-rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                )}
            />
        </Button>

    );
}
