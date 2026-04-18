import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { HeatMap } from "../heat-map";
import { renderTui } from "./render-tui";

describe("HeatMap", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const sampleData = [
    [1, 5, 9],
    [3, 7, 2],
  ];

  it("renders shade characters", () => {
    const tui = renderTui(<HeatMap data={sampleData} />);
    ({ unmount } = tui);
    const text = tui.screen.text();
    const hasShades = /[░▒▓█]/.test(text);
    expect(hasShades).toBe(true);
  });

  it("renders row labels", () => {
    const tui = renderTui(
      <HeatMap data={sampleData} rowLabels={["Mon", "Tue"]} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Mon")).toBe(true);
    expect(tui.screen.contains("Tue")).toBe(true);
  });

  it("renders column labels", () => {
    const tui = renderTui(
      <HeatMap data={sampleData} colLabels={["AM", "PM", "Eve"]} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("AM")).toBe(true);
    expect(tui.screen.contains("PM")).toBe(true);
  });

  it("shows values when showValues is true", () => {
    const tui = renderTui(<HeatMap data={sampleData} showValues />);
    ({ unmount } = tui);
    expect(tui.screen.contains("5")).toBe(true);
    expect(tui.screen.contains("9")).toBe(true);
  });

  it("renders color scale legend", () => {
    const tui = renderTui(<HeatMap data={sampleData} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Low")).toBe(true);
    expect(tui.screen.contains("High")).toBe(true);
  });

  it("renders empty state", () => {
    const tui = renderTui(<HeatMap data={[]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No data")).toBe(true);
  });
});
