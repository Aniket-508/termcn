import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Stopwatch } from "../stopwatch";
import { renderTui } from "./render-tui";

describe("Stopwatch", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders initial state as Ready", () => {
    const tui = renderTui(<Stopwatch />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Ready]")).toBe(true);
    expect(tui.screen.contains("00:00:00.00")).toBe(true);
  });

  it("starts running with autoStart", () => {
    const tui = renderTui(<Stopwatch autoStart />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Running]")).toBe(true);
  });

  it("toggles running with space key", async () => {
    const tui = renderTui(<Stopwatch />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Ready]")).toBe(true);
    tui.keys.space();
    await vi.advanceTimersByTimeAsync(100);
    expect(tui.screen.contains("[Running]")).toBe(true);
  });

  it("resets with r key", async () => {
    const tui = renderTui(<Stopwatch />);
    ({ unmount } = tui);
    tui.keys.space();
    await vi.advanceTimersByTimeAsync(1000);
    tui.keys.press("r");
    await vi.advanceTimersByTimeAsync(0);
    expect(tui.screen.contains("[Ready]")).toBe(true);
    expect(tui.screen.contains("00:00:00.00")).toBe(true);
  });

  it("shows help text", () => {
    const tui = renderTui(<Stopwatch />);
    ({ unmount } = tui);
    expect(tui.screen.contains("space start/stop")).toBe(true);
  });
});
