import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Clock } from "../clock";
import { renderTui } from "./render-tui";

describe("Clock", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T14:30:45"));
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders time in 24h format with seconds", () => {
    const tui = renderTui(<Clock format="24h" showSeconds />);
    ({ unmount } = tui);
    expect(tui.screen.contains("14:30:45")).toBe(true);
  });

  it("renders time in 12h format with AM/PM", () => {
    const tui = renderTui(<Clock format="12h" showSeconds />);
    ({ unmount } = tui);
    expect(tui.screen.contains("02:30:45")).toBe(true);
    expect(tui.screen.contains("PM")).toBe(true);
  });

  it("hides seconds when showSeconds is false", () => {
    const tui = renderTui(<Clock format="24h" showSeconds={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("14:30")).toBe(true);
    expect(tui.screen.contains("14:30:45")).toBe(false);
  });

  it("shows date when showDate is true", () => {
    const tui = renderTui(<Clock showDate />);
    ({ unmount } = tui);
    expect(tui.screen.contains("2025")).toBe(true);
    expect(tui.screen.contains("Jun")).toBe(true);
  });

  it("re-renders on interval tick", async () => {
    const tui = renderTui(<Clock format="24h" showSeconds />);
    ({ unmount } = tui);
    const framesBefore = tui.screen.frames().length;
    await vi.advanceTimersByTimeAsync(2000);
    const framesAfter = tui.screen.frames().length;
    expect(framesAfter).toBeGreaterThan(framesBefore);
  });

  it("renders large size with big digits", () => {
    const tui = renderTui(<Clock size="lg" format="24h" showSeconds={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("╔")).toBe(true);
  });
});
