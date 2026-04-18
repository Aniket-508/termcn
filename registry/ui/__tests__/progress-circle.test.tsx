import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ProgressCircle } from "../progress-circle";
import { renderTui } from "./render-tui";

describe("ProgressCircle", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders small braille character", () => {
    const tui = renderTui(<ProgressCircle value={50} size="sm" />);
    ({ unmount } = tui);
    const text = tui.screen.text();
    const hasBraille = /[○◔◑◕●◉⬤]/.test(text);
    expect(hasBraille).toBe(true);
  });

  it("shows percent when showPercent is true", () => {
    const tui = renderTui(<ProgressCircle value={75} showPercent />);
    ({ unmount } = tui);
    expect(tui.screen.contains("75%")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<ProgressCircle value={50} label="Upload" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Upload")).toBe(true);
  });

  it("clamps value to 0-100", () => {
    const tui = renderTui(<ProgressCircle value={150} showPercent />);
    ({ unmount } = tui);
    expect(tui.screen.contains("100%")).toBe(true);
  });

  it("renders md size with angle brackets", () => {
    const tui = renderTui(<ProgressCircle value={60} size="md" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("⟨")).toBe(true);
    expect(tui.screen.contains("⟩")).toBe(true);
  });

  it("renders lg size with block art", () => {
    const tui = renderTui(<ProgressCircle value={80} size="lg" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▄")).toBe(true);
  });
});
