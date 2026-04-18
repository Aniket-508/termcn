import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { TextArea } from "../text-area";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

const focusAndFlush = async (tui: TuiInstance) => {
  await tui.flush();
  tui.keys.tab();
  await tui.flush();
};

describe("TextArea", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(<TextArea label="Notes" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Notes")).toBe(true);
  });

  it("renders placeholder when empty", () => {
    const tui = renderTui(<TextArea placeholder="Write here..." />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Write here...")).toBe(true);
  });

  it("accepts typed input (uncontrolled)", async () => {
    const tui = renderTui(<TextArea id="ta" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "hello");
    expect(tui.screen.contains("hello")).toBe(true);
  });

  it("calls onChange with new value", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<TextArea value="" onChange={onChange} id="ta" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    tui.keys.press("x");
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("x");
  });

  it("handles backspace on uncontrolled", async () => {
    const tui = renderTui(<TextArea id="ta" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "ab");
    tui.keys.backspace();
    await tui.flush();
    expect(tui.screen.contains("a")).toBe(true);
  });

  it("handles new line via enter", async () => {
    const tui = renderTui(<TextArea id="ta" rows={4} />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "line1");
    tui.keys.enter();
    await tui.flush();
    await typeChars(tui, "line2");
    expect(tui.screen.contains("line1")).toBe(true);
    expect(tui.screen.contains("line2")).toBe(true);
  });

  it("navigates cursor with arrow keys", async () => {
    const tui = renderTui(<TextArea id="ta" rows={4} />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "abc");
    tui.keys.enter();
    await tui.flush();
    await typeChars(tui, "def");
    tui.keys.up();
    await tui.flush();
    tui.keys.press("X");
    await tui.flush();
    expect(tui.screen.contains("abcX")).toBe(true);
  });

  it("renders cursor when focused", async () => {
    const tui = renderTui(<TextArea id="ta" cursor="|" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    expect(tui.screen.contains("|")).toBe(true);
  });
});
