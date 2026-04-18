"use client";

import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

import { ThemeIcon } from "./icons";

export const ModeSwitcher = () => {
  const { toggleTheme } = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle extend-touch-target size-8"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <ThemeIcon className="size-4.5" strokeWidth="2" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
