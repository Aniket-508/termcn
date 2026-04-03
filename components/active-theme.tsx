"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_THEME = "default";

interface ThemeContextType {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ActiveThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) => {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  );

  useEffect(() => {
    for (const cls of [...document.body.classList].filter((c) =>
      c.startsWith("theme-")
    )) {
      document.body.classList.remove(cls);
    }
    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);

  const contextValue = useMemo(
    () => ({ activeTheme, setActiveTheme }),
    [activeTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeConfig = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
};
