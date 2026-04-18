import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { UsageMonitor } from "../usage-monitor";
import { renderTui } from "./render-tui";

describe("UsageMonitor", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders header title", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Header title="Dashboard" />
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Dashboard")).toBe(true);
  });

  it("renders tags", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Tags items={["Pro", "Active"]} />
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Pro")).toBe(true);
    expect(tui.screen.contains("Active")).toBe(true);
  });

  it("renders section with title", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Section title="CPU">
          <UsageMonitor.Metric
            label="Usage"
            value={50}
            max={100}
            percent={50}
            status="green"
            format="percent"
          />
        </UsageMonitor.Section>
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("CPU")).toBe(true);
    expect(tui.screen.contains("Usage")).toBe(true);
  });

  it("renders metric bar with fill chars", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Metric
          label="Memory"
          value={75}
          max={100}
          percent={75}
          status="yellow"
          format="number"
        />
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("░")).toBe(true);
    expect(tui.screen.contains("75.0%")).toBe(true);
  });

  it("renders stat row", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Stats>
          <UsageMonitor.StatRow label="Uptime" value="3d 5h" />
        </UsageMonitor.Stats>
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Uptime")).toBe(true);
    expect(tui.screen.contains("3d 5h")).toBe(true);
  });

  it("renders predictions", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.Predictions>
          <UsageMonitor.Prediction label="ETA" value="2 hours" />
        </UsageMonitor.Predictions>
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Predictions")).toBe(true);
    expect(tui.screen.contains("2 hours")).toBe(true);
  });

  it("renders distribution metric", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.DistributionMetric
          label="Traffic"
          segments={[
            { label: "US", percent: 60 },
            { label: "EU", percent: 40 },
          ]}
        />
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Traffic")).toBe(true);
    expect(tui.screen.contains("US")).toBe(true);
    expect(tui.screen.contains("EU")).toBe(true);
  });

  it("renders status bar", () => {
    const tui = renderTui(
      <UsageMonitor>
        <UsageMonitor.StatusBar sessionLabel="main" exitHint="Ctrl+C" />
      </UsageMonitor>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("main")).toBe(true);
    expect(tui.screen.contains("Ctrl+C")).toBe(true);
  });
});
