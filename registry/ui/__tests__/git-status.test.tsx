import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { GitStatus } from "../git-status";
import { renderTui } from "./render-tui";

describe("GitStatus", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders branch name", () => {
    const tui = renderTui(<GitStatus branch="feature/foo" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("feature/foo")).toBe(true);
  });

  it("renders counts", () => {
    const tui = renderTui(
      <GitStatus branch="main" staged={2} modified={3} ahead={1} behind={4} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("1↑")).toBe(true);
    expect(tui.screen.contains("4↓")).toBe(true);
    expect(tui.screen.contains("staged 2")).toBe(true);
    expect(tui.screen.contains("modified 3")).toBe(true);
  });
});
