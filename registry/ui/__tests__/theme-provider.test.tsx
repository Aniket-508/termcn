import { Text } from "ink";
import { renderTui } from "ink-testing";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import {
  ThemeProvider,
  useTheme,
  createTheme,
  AutoThemeProvider,
} from "../theme-provider";

describe("ThemeProvider", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <ThemeProvider>
        <Text>hello</Text>
      </ThemeProvider>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("hello")).toBe(true);
  });

  it("provides theme to descendants", () => {
    const Inner = () => {
      const theme = useTheme();
      return <Text>{theme.name}</Text>;
    };
    const tui = renderTui(
      <ThemeProvider>
        <Inner />
      </ThemeProvider>
    );
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });

  it("accepts custom theme", () => {
    const custom = createTheme({ name: "my-custom" });
    const Inner = () => {
      const theme = useTheme();
      return <Text>{theme.name}</Text>;
    };
    const tui = renderTui(
      <ThemeProvider theme={custom}>
        <Inner />
      </ThemeProvider>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("my-custom")).toBe(true);
  });

  it("createTheme merges color overrides", () => {
    const theme = createTheme({
      colors: { primary: "#ff0000" },
      name: "test",
    });
    expect(theme.name).toBe("test");
    expect(theme.colors.primary).toBe("#ff0000");
    expect(theme.colors.foreground).toBeDefined();
  });

  it("createTheme merges spacing overrides", () => {
    const theme = createTheme({
      name: "test",
      spacing: { 1: 2 },
    });
    expect(theme.spacing[1]).toBe(2);
    expect(theme.spacing[0]).toBe(0);
  });
});

describe("AutoThemeProvider", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children with auto-detected theme", () => {
    const dark = createTheme({ name: "dark" });
    const light = createTheme({ name: "light" });
    const tui = renderTui(
      <AutoThemeProvider darkTheme={dark} lightTheme={light}>
        <Text>auto</Text>
      </AutoThemeProvider>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("auto")).toBe(true);
  });
});
