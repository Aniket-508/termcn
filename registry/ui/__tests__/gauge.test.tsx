import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Gauge } from "../gauge";
import { renderTui } from "./render-tui";

describe("Gauge", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders bar fill characters for sm", () => {
    const tui = renderTui(<Gauge value={50} size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("░")).toBe(true);
  });

  it("shows percentage", () => {
    const tui = renderTui(<Gauge value={75} size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("75%")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Gauge value={30} label="CPU" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("CPU")).toBe(true);
  });

  it("clamps value to min/max range", () => {
    const tui = renderTui(<Gauge value={200} min={0} max={100} size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("100%")).toBe(true);
  });

  it("renders md size with border characters", () => {
    const tui = renderTui(<Gauge value={60} size="md" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("╭")).toBe(true);
    expect(tui.screen.contains("╯")).toBe(true);
  });

  it("renders lg size", () => {
    const tui = renderTui(<Gauge value={40} size="lg" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("╱")).toBe(true);
    expect(tui.screen.contains("╲")).toBe(true);
  });

  it("supports custom min/max", () => {
    const tui = renderTui(<Gauge value={5} min={0} max={10} size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("50%")).toBe(true);
  });
});
