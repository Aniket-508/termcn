import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { BigText } from "../big-text";
import { renderTui } from "./render-tui";

describe("BigText", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders block font with filled characters", () => {
    const tui = renderTui(<BigText>A</BigText>);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("renders multiple characters", () => {
    const tui = renderTui(<BigText>HI</BigText>);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    const lines = tui.screen.lines();
    expect(lines.length).toBeGreaterThanOrEqual(5);
  });

  it("renders slim font with box drawing chars", () => {
    const tui = renderTui(<BigText font="slim">A</BigText>);
    ({ unmount } = tui);
    expect(tui.screen.contains("╔")).toBe(true);
  });

  it("renders shade font", () => {
    const tui = renderTui(<BigText font="shade">A</BigText>);
    ({ unmount } = tui);
    expect(tui.screen.contains("▓")).toBe(true);
  });

  it("renders simple font same as block", () => {
    const tui = renderTui(<BigText font="simple">T</BigText>);
    ({ unmount } = tui);
    const lines = tui.screen.lines();
    expect(lines.length).toBeGreaterThanOrEqual(5);
  });

  it("handles lowercase by converting to uppercase", () => {
    const tui = renderTui(<BigText>abc</BigText>);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });
});
