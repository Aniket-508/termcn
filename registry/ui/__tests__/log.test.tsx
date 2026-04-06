import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Log } from "../log";
import { renderTui } from "./render-tui";

describe("Log", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const entries = [
    { level: "info" as const, message: "Server started" },
    { level: "warn" as const, message: "Deprecated API used" },
    { level: "error" as const, message: "Connection failed" },
    { level: "debug" as const, message: "Parsing config" },
  ];

  it("renders log messages", () => {
    const tui = renderTui(<Log entries={entries} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Server started")).toBe(true);
    expect(tui.screen.contains("Deprecated API used")).toBe(true);
    expect(tui.screen.contains("Connection failed")).toBe(true);
  });

  it("renders level labels", () => {
    const tui = renderTui(<Log entries={entries} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("INF")).toBe(true);
    expect(tui.screen.contains("WRN")).toBe(true);
    expect(tui.screen.contains("ERR")).toBe(true);
    expect(tui.screen.contains("DBG")).toBe(true);
  });

  it("shows scroll position indicator", () => {
    const tui = renderTui(<Log entries={entries} height={10} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("1–4/4")).toBe(true);
  });

  it("shows follow indicator", () => {
    const tui = renderTui(<Log entries={entries} follow />);
    ({ unmount } = tui);
    expect(tui.screen.contains("↓ follow")).toBe(true);
  });

  it("shows scroll hint", () => {
    const tui = renderTui(<Log entries={entries} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("j/k scroll")).toBe(true);
  });

  it("filters entries by filter string", () => {
    const tui = renderTui(<Log entries={entries} filter="error" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Connection failed")).toBe(true);
    expect(tui.screen.contains("Server started")).toBe(false);
  });

  it("scrolls down with down arrow", async () => {
    const manyEntries = Array.from({ length: 20 }, (_, i) => ({
      level: "info" as const,
      message: `Line ${i}`,
    }));
    const tui = renderTui(<Log entries={manyEntries} height={5} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Line 0")).toBe(true);
    tui.keys.down();
    await tui.flush();
    expect(tui.screen.contains("2–6/20")).toBe(true);
  });

  it("shows filter text in status bar", () => {
    const tui = renderTui(<Log entries={entries} filter="warn" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("filter: warn")).toBe(true);
  });

  it("renders timestamps when provided", () => {
    const entriesWithTime = [
      {
        level: "info" as const,
        message: "test",
        timestamp: new Date(2025, 0, 1, 14, 30, 0),
      },
    ];
    const tui = renderTui(<Log entries={entriesWithTime} showTimestamp />);
    ({ unmount } = tui);
    expect(tui.screen.contains("14:30:00")).toBe(true);
  });
});
