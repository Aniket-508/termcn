import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { StreamingText } from "../streaming-text";
import { renderTui } from "./render-tui";

describe("StreamingText", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders full text when animate is false", () => {
    const tui = renderTui(<StreamingText text="Hello World" cursor={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Hello World")).toBe(true);
  });

  it("animates text character by character", async () => {
    const tui = renderTui(
      <StreamingText text="ABCDE" animate speed={50} cursor={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("ABCDE")).toBe(false);
    await vi.advanceTimersByTimeAsync(50);
    expect(tui.screen.contains("A")).toBe(true);
    await vi.advanceTimersByTimeAsync(200);
    expect(tui.screen.contains("ABCDE")).toBe(true);
  });

  it("calls onComplete when animation finishes", async () => {
    const onComplete = vi.fn();
    const tui = renderTui(
      <StreamingText
        text="AB"
        animate
        speed={50}
        cursor={false}
        onComplete={onComplete}
      />
    );
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(150);
    expect(onComplete).toHaveBeenCalledWith("AB");
  });

  it("renders cursor when animating", async () => {
    const tui = renderTui(<StreamingText text="Hi" animate speed={100} />);
    ({ unmount } = tui);
    await vi.advanceTimersByTimeAsync(50);
    expect(tui.screen.contains("▌")).toBe(true);
  });

  it("renders without cursor when cursor is false", () => {
    const tui = renderTui(<StreamingText text="Hello" cursor={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▌")).toBe(false);
  });
});
