import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { Spinner } from "../spinner";
import { renderTui } from "./render-tui";

describe("Spinner", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders the first dots frame by default", () => {
    const tui = renderTui(<Spinner />);
    ({ unmount } = tui);
    expect(tui.screen.contains("⠋")).toBe(true);
  });

  it("renders label alongside spinner", () => {
    const tui = renderTui(<Spinner label="Loading..." />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Loading...")).toBe(true);
  });

  it("cycles through frames when time advances", async () => {
    const tui = renderTui(<Spinner />);
    ({ unmount } = tui);
    expect(tui.screen.contains("⠋")).toBe(true);
    await vi.advanceTimersByTimeAsync(200);
    const text = tui.screen.text();
    expect(text.includes("⠋")).toBe(false);
  });

  it("renders custom frames", () => {
    const tui = renderTui(<Spinner frames={["A", "B", "C"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("A")).toBe(true);
  });

  it("renders line style", () => {
    const tui = renderTui(<Spinner style="line" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("—")).toBe(true);
  });

  it("renders star style", () => {
    const tui = renderTui(<Spinner style="star" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✶")).toBe(true);
  });
});
