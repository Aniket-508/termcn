import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { PieChart } from "../pie-chart";
import { renderTui } from "./render-tui";

describe("PieChart", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const sampleData = [
    { label: "React", value: 60 },
    { label: "Vue", value: 25 },
    { label: "Svelte", value: 15 },
  ];

  it("renders pie chart block characters", () => {
    const tui = renderTui(<PieChart data={sampleData} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("renders legend labels", () => {
    const tui = renderTui(<PieChart data={sampleData} showLegend />);
    ({ unmount } = tui);
    expect(tui.screen.contains("React")).toBe(true);
    expect(tui.screen.contains("Vue")).toBe(true);
    expect(tui.screen.contains("Svelte")).toBe(true);
  });

  it("shows percentages", () => {
    const tui = renderTui(<PieChart data={sampleData} showPercentages />);
    ({ unmount } = tui);
    expect(tui.screen.contains("60.0%")).toBe(true);
  });

  it("hides legend", () => {
    const tui = renderTui(<PieChart data={sampleData} showLegend={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("■")).toBe(false);
  });

  it("renders empty state", () => {
    const tui = renderTui(<PieChart data={[]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No data")).toBe(true);
  });

  it("renders legend square markers", () => {
    const tui = renderTui(<PieChart data={sampleData} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("■")).toBe(true);
  });
});
