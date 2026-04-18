import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { BarChart } from "../bar-chart";
import { renderTui } from "./render-tui";

describe("BarChart", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const sampleData = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
  ];

  it("renders bar characters for horizontal direction", () => {
    const tui = renderTui(<BarChart data={sampleData} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("renders labels", () => {
    const tui = renderTui(<BarChart data={sampleData} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("A")).toBe(true);
    expect(tui.screen.contains("B")).toBe(true);
    expect(tui.screen.contains("C")).toBe(true);
  });

  it("renders values when showValues is true", () => {
    const tui = renderTui(<BarChart data={sampleData} showValues />);
    ({ unmount } = tui);
    expect(tui.screen.contains("10")).toBe(true);
    expect(tui.screen.contains("20")).toBe(true);
  });

  it("hides values when showValues is false", () => {
    const tui = renderTui(
      <BarChart data={[{ label: "X", value: 999 }]} showValues={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("999")).toBe(false);
  });

  it("renders title", () => {
    const tui = renderTui(<BarChart data={sampleData} title="Sales Report" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Sales Report")).toBe(true);
  });

  it("renders empty state", () => {
    const tui = renderTui(<BarChart data={[]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No data")).toBe(true);
  });

  it("renders vertical direction", () => {
    const tui = renderTui(<BarChart data={sampleData} direction="vertical" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("A")).toBe(true);
    expect(tui.screen.contains("B")).toBe(true);
  });
});
