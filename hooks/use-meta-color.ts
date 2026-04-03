import { useTheme } from "next-themes";
import * as React from "react";

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export function useMetaColor() {
  const { resolvedTheme } = useTheme();

  const metaColor = React.useMemo(
    () =>
      resolvedTheme !== "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    [resolvedTheme]
  );

  const setMetaColor = React.useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color);
  }, []);

  return {
    metaColor,
    setMetaColor,
  };
}
