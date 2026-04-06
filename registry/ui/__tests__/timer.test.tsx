import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Timer } from "../timer";
import { renderTui } from "./render-tui";

describe("Timer", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders initial duration in hms format", () => {
    const tui = renderTui(<Timer duration={90} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("00:01:30")).toBe(true);
  });

  it("shows Paused status when not autoStarted", () => {
    const tui = renderTui(<Timer duration={60} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Paused]")).toBe(true);
  });

  it("counts down when autoStart is true", async () => {
    const tui = renderTui(<Timer duration={10} autoStart />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Running]")).toBe(true);
    await vi.advanceTimersByTimeAsync(3000);
    expect(tui.screen.contains("00:00:07")).toBe(true);
  });

  it("calls onComplete when timer finishes", async () => {
    const onComplete = vi.fn();
    const tui = renderTui(
      <Timer duration={2} autoStart onComplete={onComplete} />
    );
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(2000);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(tui.screen.contains("[Done!]")).toBe(true);
  });

  it("toggles pause/resume with space", async () => {
    const tui = renderTui(<Timer duration={60} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[Paused]")).toBe(true);
    tui.keys.space();
    await vi.advanceTimersByTimeAsync(0);
    expect(tui.screen.contains("[Running]")).toBe(true);
    tui.keys.space();
    await vi.advanceTimersByTimeAsync(0);
    expect(tui.screen.contains("[Paused]")).toBe(true);
  });

  it("resets with r key", async () => {
    const tui = renderTui(<Timer duration={10} autoStart />);
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(5000);
    expect(tui.screen.contains("00:00:05")).toBe(true);
    tui.keys.press("r");
    await vi.advanceTimersByTimeAsync(0);
    expect(tui.screen.contains("00:00:10")).toBe(true);
    expect(tui.screen.contains("[Paused]")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Timer duration={60} label="Pomodoro" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Pomodoro")).toBe(true);
  });

  it("renders ms format", () => {
    const tui = renderTui(<Timer duration={90} format="ms" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("01:30")).toBe(true);
  });

  it("renders s format", () => {
    const tui = renderTui(<Timer duration={45} format="s" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("45s")).toBe(true);
  });
});
