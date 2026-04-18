import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { SplashScreen } from "../splash-screen";
import { renderTui } from "./render-tui";

describe("SplashScreen", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders big text output", () => {
    const tui = renderTui(<SplashScreen title="HI" />);
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });

  it("renders subtitle", () => {
    const tui = renderTui(<SplashScreen title="HI" subtitle="A cool app" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("A cool app")).toBe(true);
  });

  it("renders author name", () => {
    const tui = renderTui(
      <SplashScreen title="HI" author={{ name: "John" }} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("John")).toBe(true);
    expect(tui.screen.contains("Made with")).toBe(true);
  });

  it("renders status line", () => {
    const tui = renderTui(
      <SplashScreen title="HI" statusLine={<>Loading...</>} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Loading...")).toBe(true);
  });
});
