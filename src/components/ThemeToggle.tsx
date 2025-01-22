"use client";

import { useTheme } from "next-themes";
import { SunLight, HalfMoon } from "iconoir-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <SunLight className="size-5 scale-100 dark:scale-0" />
      <HalfMoon className="absolute size-5 scale-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
