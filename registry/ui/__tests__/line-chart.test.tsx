import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { LineChart } from "../line-chart";
import { renderTui } from "./render-tui";

describe("LineChart", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders plot characters", () => {
    const tui = renderTui(<LineChart data={[1, 3, 5, 2, 4]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("●")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(<LineChart data={[10, 20, 30]} title="CPU Usage" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("CPU Usage")).toBe(true);
  });

  it("renders axes by default", () => {
    const tui = renderTui(<LineChart data={[5, 10, 15]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("│")).toBe(true);
    expect(tui.screen.contains("└")).toBe(true);
  });

  it("hides axes when showAxes is false", () => {
    const tui = renderTui(<LineChart data={[5, 10, 15]} showAxes={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("└")).toBe(false);
  });

  it("renders empty state", () => {
    const tui = renderTui(<LineChart data={[]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No data")).toBe(true);
  });

  it("handles single data point", () => {
    const tui = renderTui(<LineChart data={[42]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("●")).toBe(true);
  });
});
