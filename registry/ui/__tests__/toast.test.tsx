import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Toast } from "../toast";
import { renderTui } from "./render-tui";

describe("Toast", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders message text", () => {
    const tui = renderTui(<Toast message="File saved" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("File saved")).toBe(true);
  });

  it("renders info variant icon by default", () => {
    const tui = renderTui(<Toast message="Info" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("ℹ")).toBe(true);
  });

  it("renders success variant icon", () => {
    const tui = renderTui(<Toast message="Done" variant="success" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✓")).toBe(true);
  });

  it("renders error variant icon", () => {
    const tui = renderTui(<Toast message="Fail" variant="error" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✗")).toBe(true);
  });

  it("renders warning variant icon", () => {
    const tui = renderTui(<Toast message="Warn" variant="warning" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("⚠")).toBe(true);
  });

  it("renders custom icon", () => {
    const tui = renderTui(<Toast message="Custom" icon="🔥" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("🔥")).toBe(true);
  });

  it("renders countdown bar", () => {
    const tui = renderTui(<Toast message="Hello" duration={3000} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("3.0s")).toBe(true);
  });

  it("counts down over time", async () => {
    const tui = renderTui(<Toast message="Hello" duration={3000} />);
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(1000);
    expect(tui.screen.contains("2.0s")).toBe(true);
  });

  it("calls onDismiss and disappears after duration", async () => {
    const onDismiss = vi.fn();
    const tui = renderTui(
      <Toast message="Bye" duration={2000} onDismiss={onDismiss} />
    );
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(2000);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(tui.screen.contains("Bye")).toBe(false);
  });
});
