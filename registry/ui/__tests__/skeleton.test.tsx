import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Skeleton } from "../skeleton";
import { renderTui } from "./render-tui";

describe("Skeleton", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders block characters", () => {
    const tui = renderTui(<Skeleton width={10} height={1} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("░")).toBe(true);
  });

  it("renders multiple rows", () => {
    const tui = renderTui(<Skeleton width={10} height={3} />);
    ({ unmount } = tui);
    const lines = tui.screen.lines();
    expect(lines.length).toBeGreaterThanOrEqual(3);
  });

  it("animates shimmer over time", async () => {
    const tui = renderTui(<Skeleton width={20} height={1} animated />);
    ({ unmount } = tui);
    const before = tui.screen.text();
    await vi.advanceTimersByTimeAsync(500);
    const after = tui.screen.text();
    expect(after).not.toBe(before);
  });

  it("renders static when animated is false", () => {
    const tui = renderTui(<Skeleton width={10} height={1} animated={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("░")).toBe(true);
  });
});
