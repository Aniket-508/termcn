import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { ColorPicker } from "../color-picker";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

describe("ColorPicker", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(<ColorPicker label="Color" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Color")).toBe(true);
  });

  it("renders selected color value", () => {
    const tui = renderTui(<ColorPicker autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Selected:")).toBe(true);
    expect(tui.screen.contains("#000000")).toBe(true);
  });

  it("renders hex input area", () => {
    const tui = renderTui(<ColorPicker autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("#")).toBe(true);
  });

  it("navigates palette with arrow keys", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<ColorPicker onChange={onChange} autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("#800000");
  });

  it("selects color on enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<ColorPicker onSubmit={onSubmit} autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).toHaveBeenCalledWith("#000000");
  });

  it("switches to hex mode on tab", async () => {
    const tui = renderTui(<ColorPicker autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    expect(tui.screen.contains("navigate")).toBe(true);
    tui.keys.tab();
    await tui.flush();
    expect(tui.screen.contains("Type hex")).toBe(true);
  });

  it("accepts hex input in hex mode", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<ColorPicker onSubmit={onSubmit} autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.tab();
    await tui.flush();
    await typeChars(tui, "ff0000");
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).toHaveBeenCalledWith("#ff0000");
  });

  it("handles custom palette", () => {
    const palette = ["#111111", "#222222"];
    const tui = renderTui(<ColorPicker palette={palette} autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("#111111")).toBe(true);
  });

  it("navigates palette down", async () => {
    const onChange = vi.fn();
    const palette = [
      "#000000",
      "#111111",
      "#222222",
      "#333333",
      "#444444",
      "#555555",
      "#666666",
      "#777777",
      "#888888",
      "#999999",
    ];
    const tui = renderTui(
      <ColorPicker palette={palette} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("#888888");
  });
});
