import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { NotificationCenter } from "../notification-center";
import { renderTui } from "./render-tui";

describe("NotificationCenter", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders nothing when no notifications", () => {
    const tui = renderTui(<NotificationCenter />);
    ({ unmount } = tui);
    expect(tui.screen.text().trim()).toBe("");
  });
});
