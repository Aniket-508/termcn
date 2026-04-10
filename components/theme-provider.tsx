"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeShortcut = () => {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [resolvedTheme, setTheme]);

  return null;
};

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
    {...props}
  >
    <ThemeShortcut />
    {children}
  </NextThemesProvider>
);
